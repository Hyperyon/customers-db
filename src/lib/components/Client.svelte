<script type="text/javascript">
import {createEventDispatcher as ED} from 'svelte'
import Fuzzy from "svelte-fuzzy"
export let customerList = []

const dispatch = ED()
const digit = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨']
let newCustomer = ''
let lines = 0
let input = ''
let is_submit = false

function saveCustomer() {
	sortAndCapitalize()
	if(!is_submit){
		dispatch('adding', newCustomer)
		is_submit = true
	}
// 	reset()
}
function reset(){
	newCustomer = ''
	input = ''
	lines = 0
	is_submit = false
}
  let query = ''
  let options = { keys: ["payload"] };
  let data = []
  let formatted = [];

$:if(formatted.length > 8)
	formatted = formatted.slice(0,8)
	

function countLines() {
	let text = input
	lines = text.split("\n").filter(item => item).length
	if (text.length === 0)
		lines = 0

	let dummy = input.split('\n')
	query = dummy[dummy.length-1]
	data = []
	customerList.forEach(item=>{
		data.push({payload:item})
	})
}

function sortAndCapitalize() {
	let lines = input
	.replace("-","")
	.trim().replace(/^\s*[\r\n]/gm, "")
	.split("\n").filter(item => item).sort()

	let capitalizedLines = lines.map(line => line.toUpperCase())
	newCustomer = capitalizedLines
	input = capitalizedLines.join("\n")

	for(var i=0; i < digit.length;i++){
		var re = new RegExp(i+1, "g");
		input = input.replace(re, digit[i])
	}
	copyTextarea()
}

function copyTextarea() {
    let textarea = document.getElementsByTagName("textarea")[0];
    textarea.select();
    document.execCommand("copy");
}

function add(tab) {
	let name = ''
	tab.forEach(item =>{name+=item.text})
	input = input.split('\n');input.pop()
	name = (input.length) ? '\n'+name+'\n':name+'\n'
	input = input.join('\n')+name
	document.querySelector('[autofocus]').focus();

	countLines()
}

</script>

<style type="text/css">
textarea {
    padding: 10px;
    width: 7.5rem;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
  	resize: none;
  	display: inline-block;
}
textarea:focus{
	background: skyblue;
	outline: none;
	border: 1px black solid;
}

#suggestion:hover{
background: grey;
}

div#suggestion-liste{
left: 0px;
background: orange;
float:right;
width: 6rem;
/*overflow: hidden;*/
}

#wrap{
	width:15rem;
	background: green;
}
</style>

<Fuzzy {query} {data} {options} bind:formatted />
<div id="wrap">
	<textarea cols="30" rows="15" 
	bind:value={input}
	on:input={countLines}
	autofocus="true" 
	/>
	<div id="suggestion-liste">

{#each formatted as item}
  {#each item as line}
    <div id="suggestion" on:click={()=>add(line)}>
      {#each line as { matches, text }}
        {#if matches}
          <mark>{text}</mark>
        {:else}
          {text}
        {/if}

      {/each}
    </div>
  {/each}
{/each}

	</div>
</div>


<br>
<button on:click={saveCustomer}>send</button>
<input type="button" value={lines}>
<input type="button" value="reset" on:click={reset}>


