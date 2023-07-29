var nameInbut = document.getElementById("nameInbut")
var priceInbut = document.getElementById("priceInbut")
var CategoryInbut = document.getElementById("CategoryInbut")
var descInbut = document.getElementById("descInbut")
var searchInput = document.getElementById("searchInput")
currentIndex=0
var productList =[]
if(localStorage.getItem('products')!=null){
    productList =JSON.parse(localStorage.getItem("products")) 
    display()   
}
function addProduct (){
  if(valid(/^[A-Z][a-z]{3,20}[1-9]?$/,nameInbut)==true && 
     valid(/^[1-9][0-9]{2,6}$/,priceInbut)==true){
    var product = {
      name:nameInbut.value,
      price:priceInbut.value,
      category:CategoryInbut.value,
      desc:descInbut.value,
  }
  productList.push(product)
  localStorage.setItem("products",JSON.stringify(productList))
  display()
  clearForm ()
  }
}
function display (){
    var temp = ""
    for(var i= 0;i<productList.length;i++){
        temp+=`   <tr>
        <td>`+i+`</td>
        <td>`+productList[i].name+`</td>
        <td>`+productList[i].price+`</td>
        <td>`+productList[i].category+`</td>
        <td>`+productList[i].desc+`</td>
        <td><button class="btn btn-outline-warning" onclick="setFormForUpdata(`+i+`)">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteproduct(`+i+`)">delete</button></td>
      </tr>`
    }
    document.getElementById("myData").innerHTML=temp
}
function clearForm (){
    nameInbut.value=""
    priceInbut.value=""
    CategoryInbut.value=""
    descInbut.value=""
}
function deleteproduct (index){
    productList.splice(index,1)
    localStorage.setItem("products",JSON.stringify(productList))
    display()
}
function searchproduct () {
  var  searchval = searchInput.value.toLowerCase()
  var temp = ""
  for(var i=0;i<productList.length;i++){
    if(productList[i].name.toLowerCase().includes(searchval)==true ||
    productList[i].category.toLowerCase().includes(searchval)==true )
    {
        temp+=`   <tr>
        <td>`+i+`</td>
        <td>`+productList[i].name.toLowerCase().replace(searchval,"<span class='text-danger'>"+searchval+"</span>")+`</td>
        <td>`+productList[i].price+`</td>
        <td>`+productList[i].category.toLowerCase().replace(searchval,"<span class='text-info'>"+searchval+"</span>")+`</td>
        <td>`+productList[i].desc+`</td>
        <td><button class="btn btn-outline-warning">update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteproduct(`+i+`)">delete</button></td>
      </tr>`
    }
  }
  document.getElementById("myData").innerHTML=temp

}

function setFormForUpdata (index){
  currentIndex=index
 nameInbut.value=productList[index].name
 priceInbut.value=productList[index].price
 CategoryInbut.value=productList[index].category
 descInbut.value=productList[index].desc
 document.getElementById("addptn").style.display="none"
 document.getElementById("editbtn").style.display="inline-block"
}
function updataProduct(){
  productList[currentIndex].name= nameInbut.value
  productList[currentIndex].price=priceInbut.value
  productList[currentIndex].category=CategoryInbut.value
  productList[currentIndex].desc=descInbut.value
  localStorage.setItem("products",JSON.stringify(productList))
  display()
  document.getElementById("addptn").style.display="inline-block"
  document.getElementById("editbtn").style.display="none" 
  clearForm()
}
nameInbut.addEventListener("blur",function(){
  var regxName = /^[A-Z][a-z]{3,20}[1-9]?$/
  valid(regxName,nameInbut)
})
priceInbut.addEventListener("blur",function(){
  var regxPrice =  /^[1-9][0-9]{2,6}$/
  valid(regxPrice,priceInbut)
})
function valid(regex,inputEl){
  if(regex.test(inputEl.value)==true){
    inputEl.classList.add("is-valid")
    inputEl.classList.remove("is-invalid")
    return true
  }else{
    inputEl.classList.add("is-invalid")
    inputEl.classList.remove("is-valid")
     return false
  }
}

