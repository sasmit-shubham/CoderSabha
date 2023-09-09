// for(var i=0; i<5; i++){
//     ((i)=>{
//         setTimeout(()=>{
//             console.log(i);
//         },2000)
//     })(i)
// }

// function callApi(method){
//     return (url) => {
//         console.log(`This callapi funtion is using ${method} method and ${url} url`);
//     }
// }

// callApi('GET')("https://www.linkedin.com/in/shubham-kumar-824751193/");


// apply call bind 

// let userDetails = {
//     name:"Shubham Kumar",
//     age: "22",
//     designation:"sde",
//     printDetails: function(){
//         console.log(this);
//     }
// }


// userDetails.printDetails();


// ek class ke properties ko dusri class mai use kar rhe ho
// har cheez js ke andar object hi use kar rhe hain


// const obj = new Object({
//     name:"Ajay",

// })

// const obj = {
//     name:"Shubham Kumar"
// }
// console.log(obj)

// const obj2 = {
//     roll:1
// }


function chunk(arr, input) {
    // write your solution below
    let ans = new Array();
    
    const n = arr.length;
    for(let i=0; i<n; i+=input){
      if((i+input)>=n){
        let diff = n-i;
        let slicedArr = arr.slice(i,i+diff);
        ans.push(slicedArr);
        continue;
      }
      let slicedArr = arr.slice(i,i+input);
      ans.push(slicedArr);
    }
    for(let x of ans){
        for(let y of x){
            console.log(y)
        }
        console.log("line break")
    }
    
}
let arr = [1,2,3,4,5,6,7]
chunk(arr,2)