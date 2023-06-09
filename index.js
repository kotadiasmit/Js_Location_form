const tableBodyContainer = document.getElementById('table-body-container')
const addLocationBtn=document.getElementById('addLocationBtn')
const formHeading=document.getElementById('form-heading')
const inputUsername=document.getElementById('username')
const inputTextarea=document.getElementById('textarea')
const updateBtnContainer=document.getElementById('update-btn-container')
const addBtnContainer=document.getElementById('add-btn-container')
const addBtn=document.getElementById('add-btn')
const locationUpdateBtn=document.getElementById('location-update-btn')
const modelContainerEle=document.getElementById('model-container')
const modelBackdrop=document.getElementsByClassName('modal-backdrop')
const deleteModelLabel=document.getElementById('deleteModelLabel')
const deleteLocation=document.getElementById('deleteLocation')

let userLocationArray=[]

let deleteArrayIndex

const addLocationModal = document.getElementById('staticBackdrop')
addLocationModal.addEventListener('shown.bs.modal', () => {
    inputUsername.focus()
})

addLocationBtn.onclick=function(){
    inputUsername.value=''
    inputTextarea.value=''
    //modelContainerEle.classList.remove('close-popup')
    updateBtnContainer.classList.add('update-add-location-btn')
    addBtnContainer.classList.remove('update-add-location-btn')
    addBtn.setAttribute('data-bs-dismiss',"modal")
    formHeading.textContent='Add Location Data'
    
}

deleteLocation.onclick=function(){
     console.log(deleteArrayIndex)
     userLocationArray.splice(deleteArrayIndex,1)
    console.log(userLocationArray)
    let updatedUserLocationArray=userLocationArray.map((each,index)=>({
        userId: index+1,
        name:each.name,
        location:each.name
    }))
    userLocationArray=updatedUserLocationArray
    tableBodyContainer.textContent=''
    userLocationArray.map(each=>addLocation(each))
 }

function addLocation(userDetails){
    const rowId='row'+userDetails.userId
    const tableRowEle=document.createElement('tr')
    tableRowEle.classList.add('capitalize')
    tableRowEle.id=rowId
    tableBodyContainer.appendChild(tableRowEle)

    const srNo=document.createElement('th')
    srNo.setAttribute('scope','row')
    srNo.textContent= userDetails.userId
    tableRowEle.appendChild(srNo)

    const userName=document.createElement('td')
    userName.textContent=userDetails.name
    tableRowEle.appendChild(userName)
    
    const userLocation=document.createElement('td')
    userLocation.textContent=userDetails.location
    tableRowEle.appendChild(userLocation)

    const updateDelBtnContainer=document.createElement('td')
    tableRowEle.appendChild(updateDelBtnContainer)

    const updateBtn=document.createElement('button')
    updateBtn.classList.add('update-delete-btn')
    updateBtn.setAttribute('data-bs-toggle',"modal")
    updateBtn.setAttribute('data-bs-target',"#staticBackdrop")
    updateBtn.textContent="Update"
    updateDelBtnContainer.appendChild(updateBtn)

    const btnSpan=document.createElement('span')
    btnSpan.textContent='/'
    btnSpan.classList.add('slash')
    updateDelBtnContainer.appendChild(btnSpan)

    const deleteBtn=document.createElement('button')
    deleteBtn.classList.add('update-delete-btn')
    deleteBtn.textContent="Delete"
    deleteBtn.setAttribute('data-bs-toggle',"modal") 
    deleteBtn.setAttribute('data-bs-target',"#deleteModel")
    updateDelBtnContainer.appendChild(deleteBtn)

    deleteBtn.onclick=function(){
        deleteArrayIndex=userLocationArray.findIndex((each)=>'row'+each.userId===rowId)
        deleteModelLabel.textContent=userLocationArray[deleteArrayIndex].name
     }

    updateBtn.onclick=function(){
        updateBtnContainer.classList.remove('update-add-location-btn')
        addBtnContainer.classList.add('update-add-location-btn')
        formHeading.textContent='Update Location Data'
        const arrayIndex=userLocationArray.findIndex((each)=>'row'+each.userId===rowId)
        const nameValue=userLocationArray[arrayIndex].name
        const locationValue=userLocationArray[arrayIndex].location
        inputUsername.value=nameValue
        inputTextarea.value=locationValue
        locationUpdateBtn.onclick=updateLocation
    }
    function updateLocation(event){
        const userNameValue=inputUsername.value
        const userLocationValue=inputTextarea.value
        if(userNameValue !== '' && userLocationValue !==""){
            const arrayIndex=userLocationArray.findIndex((each)=>'row'+each.userId===rowId)
            console.log(arrayIndex)
            userLocationArray[arrayIndex].location=inputTextarea.value
            userLocationArray[arrayIndex].name=inputUsername.value
            console.log(userLocationArray[arrayIndex])
            tableBodyContainer.textContent=''
            userLocationArray.map(each=>addLocation(each))
        }
        else{
            console.log(event)
            event.preventDefault()
            alert('Please enter valid details')
        }
    }

}
addBtn.onclick=function(event){
    let userNameValue=inputUsername.value.trim()
    let userLocationValue=inputTextarea.value.trim()

    // userNameValue.trim()
    // userLocationValue.trim()

    let userId
    userLocationArray.length===0? userId=1:userId=userLocationArray[userLocationArray.length-1].userId+1
    //console.log(userId)
    if(userNameValue !== '' && userLocationValue !==""){
        const userDetailsObj={
            userId,
            name:userNameValue,
    location: userLocationValue
   }
   userLocationArray.push(userDetailsObj)
   addLocation(userDetailsObj)
   
}else{
    console.log(event)
    event.preventDefault()
    alert('Please enter valid details')
    addBtn.removeAttribute('data-bs-dismiss',"modal")

}

}



 