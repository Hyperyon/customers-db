<script type="text/javascript">
import {createEventDispatcher as ED} from 'svelte'
import Line from './Line.svelte'
import Fuzzy from "svelte-fuzzy"
export let customerList = []

const dispatch = ED()
const digit = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨']
let newCustomer = ''
let lines = 0
let input = ''

function saveCustomer() {
	sortAndCapitalize()
		dispatch('adding', newCustomer)
}

function reset(){
	newCustomer = ''
	input = ''
	lines = 0
    tab = []
}
  let query = ''
  let options = { keys: ["payload"] }
  let data = []
  let formatted = []

$:if(formatted.length > 8)
	formatted = formatted.slice(0,8)

function show_suggestion() {data = customerList.map(item => ({payload:item}))}

function sortAndCapitalize() {
newCustomer = tab.map(x => x
                    .replace("-"," ")
                    .trim()
                    .toUpperCase())
                .filter(x => x)
                .sort();

    tab=newCustomer
    newCustomer = tab.map(x=>x.replace(/\d/g, '').trim())
	input = tab.join("\n")

	for(var i=0; i < digit.length;i++){
		var re = new RegExp(i+1, "g");
		input = input.replace(re, digit[i])
	}
	copy(input)
}

function copy(text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function add(line,autocomplete = false) {
    if(autocomplete){
        let digit = /\d/.test(query[0]) ? ' '+ query[0]:''
        query=line.map(item => item.text).join('') + digit
    }
    tab = [...tab,query]
    query = ''
    lines = tab.length
}

let tab = []

function oui(e) {
    if (e.key === 'Enter'){
        if(!query){
            document.getElementById('saisie').focus()
            return false
        }
        add('line')
    }
    show_suggestion()
}

function update_data(e) {
    let new_data = e.originalTarget.innerHTML
    query = new_data
}

</script>

<svelte:window on:keydown={oui}/>
<Fuzzy {query} {data} {options} bind:formatted />

{#each tab as item}
    <Line bind:content={item}/>
{/each}

 <input id="saisie"type="text" 
 on:keydown={oui} 
 bind:value={query} autofocus >

<div id="liste">
{#each formatted as item}
    {#each item as line}
        <div id="suggestion" on:click={()=>add(line,true)}>
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

<br>
<button on:click={saveCustomer}>send</button>
<input type="button" value={lines}>
<input type="button" value="reset" on:click={reset}>

<style type="text/css">
#saisie, #saisie:focus, #saisie:hover{
        background: orange;
        border: none;
        min-width: 20px;
    }

    #suggestion:hover{
        background: #bfbfbf;
        width: 250px;
    }

    #liste{
        background: #efefef;
        width: 260px;
        }
</style>