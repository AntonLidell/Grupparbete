 /*
var db = new alasql.Database("database_test");
db.exec("CREATE TABLE example (a INT, b INT)");

// You can insert data directly from javascript object...
db.tables.example.data = [ 
    {a:5,b:6},
    {a:3,b:4}
];

// ...or you can insert data with normal SQL 
db.exec("INSERT INTO example VALUES (1,3)");

var res = db.exec("SELECT * FROM example ORDER BY b DESC");
console.table(res);
// res now contains this array of objects:
// [{a:1,b:3},{a:3,b:4},{a:3,b:4}]


alasql("Create database test_database");
alasql("use test_database");
alasql("CREATE TABLE test (language INT, hello STRING)");
alasql("INSERT INTO test VALUES (1,'Hello!')");
console.table(alasql("SELECT hello FROM test WHERE language > 1"));
text_var = alasql("SELECT language FROM test WHERE language > 1");
*/

alasql("Create database test_database");
alasql("use test_database");
alasql("CREATE TABLE diagnos (year int, diagnos string, antal float)");
alasql("CREATE TABLE healthcare (year int, diagnos string, antal float)");
/*
diagnos_var = [];
for (var i = 0; i < data_sick.length; i++) {
    if (toString(data_sick[i].diagnoskapitel_kod) !== null) {
        diagnos_var.push(data_sick[i].diagnoskapitel_kod);
    }
    else {
        diagnos_var.push(" ");
    }
}
*/

// Inläsning till sql
for (var i = 0; i < data_diagnos.length; i++) {
  alasql("INSERT INTO diagnos VALUES ("+ Number(data_diagnos[i].ar) + ",'" 
  + data_diagnos[i].diagnoskapitel_kod + "','"
  + Number(data_diagnos[i].antal) + "')");
}


for (var i = 0; i < data_healthcare.length; i++) {
  alasql("INSERT INTO healthcare VALUES ("+ Number(data_healthcare[i].ind_id) + ",'" 
  + data_healthcare[i].question + "','"
  + data_healthcare[i].value + "')");
}     

// skriv data

text_var = alasql("SELECT * FROM diagnos");
text_list = [];
review_var = [];
for (var i = 0; i < text_var.length; i++)  {
  text_list.push(text_var[i]["year"]);
  review_var.push(text_var[i]["antal"]);
}

//Diagnos
var data_histo_price = [{
x: text_list,
y: review_var,
mode: 'markers',
type: 'scatter',
}];

var layout_price = {
  title: "Historigram Price",
  xaxis: {title: "Price"},
  yaxis: {title: "Count"},
}

histo_price = document.getElementById('histogram_price');  
Plotly.plot(histo_price, data_histo_price, layout_price);  

text_var = alasql("SELECT * FROM healthcare");
text_list = [];
review_var = [];
for (var i = 0; i < text_var.length; i++)  {
  text_list.push(text_var[i]["year"]);
  review_var.push(text_var[i]["antal"]);
}


//Healthcare
var data_histo_guest = [{
  x: text_list,
  y: review_var,
  mode: 'markers',
  type: 'scatter',
  }];
  
  var layout_guest = {
    title: "Historigram Price",
    xaxis: {title: "Price"},
    yaxis: {title: "Count"},
  }
  
  histo_guest = document.getElementById('histogram_guest');  
  Plotly.plot(histo_guest, data_histo_guest, layout_guest); 


// Knapptryckning

function displayDate() {
  text_var = alasql("SELECT * FROM diagnos WHERE year = 2006");
  text_list = [];
  review_var = [];
  for (var i = 0; i < text_var.length; i++)  {
      text_list.push(text_var[i]["year"]);
      review_var.push(text_var[i]["antal"]);
  }

  var data_histo_price = [{
  x: text_list,
  y: review_var,
  mode: 'markers+lines',
  type: 'scatter',
  }];

  histo_price = document.getElementById('histogram_price');               
  Plotly.react(histo_price, data_histo_price, layout_price);                   
}