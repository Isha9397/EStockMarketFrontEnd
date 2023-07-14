var subject= [];
var marks= [];
var index= [];
var c= 1;
var fullMarks= [];

function addToTable(){
    
    document.getElementById('no-data').style.display="none";
    var sub= parseInt(document.getElementById('companyCode').value);
    var num= document.getElementById('companyName').value;
    var fullnum= document.getElementById('companyCEO').value;
    var fullnum= parseInt(document.getElementById('companyTurnOver').value);
    var fullnum= document.getElementById('companyWebsite').value;
    var fullnum= parseInt(document.getElementById('stockPrice').value);
    if(sub && num && num<=fullnum){
        subject= [...companyCode,sub];
        marks= [...companyName,num];
        fullMarks= [...companyCEO,fullnum];
        index= [...index,c];

        // document.getElementById('btn2').style.background= "cornflowerblue";
        // document.getElementById('btn2').disabled= false;

        // document.getElementById('btn3').style.background= "red";
        // document.getElementById('btn3').disabled= false;

        displayTable();
    }
    else{
        alert("Marks is either greater than full marks or incomplete data");
    }
}

function displayTable(){
    const length= companyName.length;
    
    var tr= document.createElement('tr');

    for(var i=0;i<length;i++){
        tr.innerHTML='';
        var td1= document.createElement('td');
        td1.innerHTML= index[i];
        tr.appendChild(td1);

        var td2= document.createElement('td');
        td2.innerHTML= companyCode[i];
        tr.appendChild(td2);

        var td3= document.createElement('td');
        td3.innerHTML= companyName[i];
        tr.appendChild(td3);

        var td4= document.createElement('td');
        td4.innerHTML= companyCEO[i];
        tr.appendChild(td4);

        document.getElementsByTagName('tbody')[0].appendChild(tr);
    }
    c++;
    document.getElementById('companyCode').value='';
    document.getElementById('companyName').value='';
    document.getElementById('companyCEO').value='';
}