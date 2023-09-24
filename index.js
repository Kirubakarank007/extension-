let myLeads=[]
let inputEl=document.getElementById("input-el")
const  inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
let deleteBtn=document.getElementById("delete-btn")
let saveBtn=document.getElementById("save-btn")

let localStorageFrom=JSON.parse(localStorage.getItem("myLeads"))
if(localStorageFrom)
{
    myLeads=localStorageFrom
    pushel(myLeads)
}

function pushel(leads)
{
    let listItems=""
    for(let i=0;i<leads.length;i++)
        {
             listItems+=`
                     <li>
                         <a target='_blank' href='${leads[i]}'>
                             ${leads[i]}
                         </a>
                     </li>`
}
ulEl.innerHTML=listItems
}

saveBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        pushel(myLeads)
    });
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value=""
    localStorage.setItem ("myLeads",JSON.stringify(myLeads))
    pushel(myLeads)
})


deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear()
    console.log("clicked")
    myLeads=[]
    pushel(myLeads)
})
