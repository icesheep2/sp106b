var fs = require('fs');
var file =  process.argv[2];   

var d = {
  ""   :"000",
  "M"  :"001",
  "D"  :"010",
  "MD" :"011",
  "A"  :"100",
  "AM" :"101",
  "AD" :"110",
  "AMD":"111"
}

var c = {
  "0"   :"0101010",
  "1"   :"0111111",
  "-1"  :"0111010",
  "D"   :"0001100",
  "A"   :"0110000", 
  "M"   :"1110000",
  "!D"  :"0001101",
  "!A"  :"0110001", 
  "!M"  :"1110001",
  "-D"  :"0001111",
  "-A"  :"0110011",
  "-M"  :"1110011",
  "D+1" :"0011111",
  "A+1" :"0110111",
  "M+1" :"1110111",
  "D-1" :"0001110",
  "A-1" :"0110010",
  "M-1" :"1110010",
  "D+A" :"0000010",
  "D+M" :"1000010",
  "D-A" :"0010011",
  "D-M" :"1010011",
  "A-D" :"0000111",
  "M-D" :"1000111",
  "D&A" :"0000000",
  "D&M" :"1000000",
  "D|A" :"0010101",
  "D|M" :"1010101"
}

var jjj = {
  ""   :"000",
  "JGT":"001",
  "JEQ":"010",
  "JGE":"011",
  "JLT":"100",
  "JNE":"101",
  "JLE":"110",
  "JMP":"111"
}


var dic = {
  "R0"  :0,
  "R1"  :1,
  "R2"  :2,
  "R3"  :3,
  "R4"  :4,
  "R5"  :5,
  "R6"  :6,
  "R7"  :7,
  "R8"  :8,
  "R9"  :9,
  "R10" :10,
  "R11" :11,
  "R12" :12,
  "R13" :13,
  "R14" :14,
  "R15" :15,
  "SP"  :0,
  "LCL" :1,
  "ARG" :2,
  "THIS":3, 
  "THAT":4,
  "KBD" :24576,
  "SCREEN":16384
};
var asb=16

const readline = require('readline'); 
const r2 = readline.createInterface({
  input: fs.createReadStream(file)
});
const rl = readline.createInterface({
    input: fs.createReadStream(file)
});
var colnum=9 
var temparray1,temparray2,tempcount=0
temparray1 = new Array()
temparray2 = new Array()

r2.on('line', (line2) => {
  colnum++
  if(line2[0]=='('){
    temparray1[tempcount]=line2 //存名子
    temparray1[tempcount+1]="none"
    temparray2[tempcount]=colnum //存行數
    tempcount++
  } 
});

fs.writeFile("fuck.txt","" , function(err){
})

rl.on('line', (line) => {             //讀取每一行並執行
if(line[0]=="@"){
  var sliceline = line.slice(1)
  if(isNaN(line[1])==false){
    console.log(enter0(dec2bin(parseInt(line.slice(1))))) 
    fs.appendFile("fuck.txt",enter0(dec2bin(parseInt(line.slice(1))))+"\n" , function(err){})
  }
  else if (dic[sliceline]!=undefined){ //遮蔽第一位元
    console.log(enter0(dec2bin(dic[sliceline])))
    fs.appendFile("fuck.txt",enter0(dec2bin(dic[sliceline]))+"\n" , function(err){})
  }
  else if(line[0]!='('){
    var L =line.slice(1)
    L='('+L+')'
    var icount=0,ended=0
    do{
      if(L==temparray1[icount]){
        console.log(enter0(dec2bin(temparray2[icount])))
        fs.appendFile("fuck.txt",enter0(dec2bin(temparray2[icount]))+"\n" , function(err){})
        ended=1
      }
      else if(temparray1[icount]=="none"){
        console.log(enter0(dec2bin(asb)))
        fs.appendFile("fuck.txt",enter0(dec2bin(asb))+"\n" , function(err){})
        asb++
        ended=1
      }
      icount++
    }while(ended==0)
  }
}
else {
  var x,y
  for(var i=0;i<=50;i++){
    if(line[i]==';'){
       x = line.slice(0,i)
       y = line.slice(i+1)
       console.log("111"+c[x]+"000"+jjj[y])
       fs.appendFile("fuck.txt","111"+c[x]+"000"+jjj[y]+"\n" , function(err){})
    break
    }
    else if (line[i]=='='){
      x = line.slice(0,i)
      y = line.slice(i+1)
      console.log("111"+c[y]+d[x]+"000")
      fs.appendFile("fuck.txt","111"+c[y]+d[x]+"000"+"\n" , function(err){})
   break
    }
  }
}
});



function dec2bin(a){
  var y = a.toString(2); //十進位轉二進位
  return y
}

function enter0(a){
  var x = 16-a.length
for(var i=0;i<x;i++){
  a="0"+a;
}
  return a
}

