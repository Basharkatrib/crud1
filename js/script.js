let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let search=document.getElementById('search');
let bytitles =document.getElementById('bytitle');
let bycategory =document.getElementById('bycategory');



//get total
let mod;
let tmp;
//getTotal
function getTotal(){
    if(price.value!=''){
        let resault=(+price.value + +taxes.value + +ads.value)-  +discount.value;
        total.innerHTML=resault;
        total.style.background='green';
    }
    else{
        total.innerHTML='';
        total.style.background='red';
    }
}

//create
let datapro;

    if(localStorage.prod != null){
        datapro=JSON.parse(localStorage.prod);
    }
    else{
        datapro=[];
    }

mode='create';
submit.onclick=function(){
    let newpro={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,

    }
    if(title.value !='' && count.value<=100){
    if(mode==='create'){

        if(newpro.count>1){
            for(let i=0;i<newpro.count;i++){
                datapro.push(newpro);
            }
        }else{
            datapro.push(newpro);
        }
    }else{
        
        datapro[tmp]=newpro;
        mode='create';
        submit.innerHTML='create';
        count.style.display='block';
       
    }
    total.style.background='red';
}
   
    localStorage.setItem('prod', JSON.stringify(datapro));
    clearData();
    showData();

}

//clearData
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';

}

//showData
function showData(){
let table='';
for(let i=0;i < datapro.length;i++){
     table +=`
     
     
     <tr>
     <td>${i+1}</td>
     <td>${datapro[i].title}</td>
     <td>${datapro[i].price}</td>
     <td>${datapro[i].taxes}</td>
     <td>${datapro[i].ads}</td>
     <td>${datapro[i].discount}</td>
     <td>${datapro[i].total}</td>
     <td>${datapro[i].count}</td>
     <td>${datapro[i].category}</td>
     <td><button onclick="updateData(${i})" id="update">update</button></td>
     <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
 </tr>  
     
     `
}
document.getElementById("tbody").innerHTML=table;

if(datapro.length>0) {
    document.getElementById('deleteAll').innerHTML=`
    <button onclick="deleteAll()">delete all (${datapro.length})</button>
    `
}
else{
    document.getElementById('deleteAll').innerHTML='';
}

}
showData();


//delete
function deleteData(i){
    datapro.splice(i,1);
    localStorage.prod=JSON.stringify(datapro);
    showData();
}



//delete all
function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showData();
}


//updatedata
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    category.value=datapro[i].category;
    count.style.display='none';
    getTotal();
    submit.innerHTML='update';
    mode='update';
    tmp=i;
}


//getsearchby

let searchby='title';
function getsearchby(id){
    if (id == 'bytitle') {
      search.placeholder="search by title";
      searchby='title';
        
    }else{
        searchby='category';
        search.placeholder='search by category';
    }
    search.focus();
    search.value='';
    showData();
    bytitles.value='search by title';
    bycategory.value='search by category';
 
}


function searchall(value){
  
    let table='';
    let counter=0;
    if(searchby == 'title'){
       for(let i=0;i<datapro.length;i++){
        if(datapro[i].title.includes(value)){
            table +=`
     
     
            <tr>
            <td>${i+1}</td>
            <td>${datapro[i].title}</td>
            <td>${datapro[i].price}</td>
            <td>${datapro[i].taxes}</td>
            <td>${datapro[i].ads}</td>
            <td>${datapro[i].discount}</td>
            <td>${datapro[i].total}</td>
            <td>${datapro[i].count}</td>
            <td>${datapro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>  
            
            `
            counter=counter+1;
           
           
        }
        
      
        
       
       }
       c1=counter;
       
       bytitles.value=`there is (${counter})`;
       bycategory.value="search by categorey";
      
    }else{
        let counter2=0;
        for(let i=0;i<datapro.length;i++){
            if(datapro[i].category.includes(value)){
                table +=`
         
         
                <tr>
                <td>${i+1}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].count}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
            </tr>  
                
                `
                counter2=counter2+1;
            }
          
           }
           bycategory.value=`there is (${counter2})`;
           bytitles.value="search by title";
        
           
    }
   
    document.getElementById("tbody").innerHTML=table;
    
   

}



