//============================================================================================================
var width = 1280;
var height = 400;
var upah;
var scale;
var scaleWarna;
var upahMin;
var upahMax;
var biayaHidup;
var selisih;
var umkDewasa;
var biayaDewasa;
var biayaAnak;
var areas;
var group;

var a = 0;

var url = 'https://louislugas.github.io/umk-sbh-jawa-map/GeoJSON/UMKSBHJawa.geojson';

var projection = d3.geoMercator()
  .scale(6000)
  .translate([-10950,-600]);

var path = d3.geoPath()
  .projection(projection);

//CANVAS-INFOGRAPHIC==========================================================================================
var canvas = d3.select(".infographic").append("svg")
  .attr("width",width)
  .attr("height",height);

//TOOLTIP=====================================================================================================
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .attr("width",300)
    .attr("height",300)
    .attr("fill","red");

//LEGEND=====================================================================================================
var legend = d3.select("#legend").append("svg")
  .attr("width",200)
  .attr("height",250)
  .attr("fill","salmon");

//============================================================================================================

$("#play").click(function() {
  $('.transform').toggleClass('transform-active');
});

//============================================================================================================
//MASUKIN DATA KABUPATEN-KOTA KE LIST OPTION FORM
function populateKabkot() {
  var ele = document.getElementById("inputGroupKabkot");
  /*  TUTORIAL JQUERY LOAD JSON
  $.getJSON("/GeoJSON/UMKSBHJawa.geojson", function(data) {
    console.log(data.features[100].properties.KABKOT);
  });
  */
 //LOAD JSON INTO VARIABLE
 $.ajax({
   url: "https://louislugas.github.io/umk-sbh-jawa-map/GeoJSON/UMKSBHJawa.geojson",
   dataType:  "json",
   type: "get",
   cache: false,
   success: function(data) {
     $(data.features).each(function(index, value) {
       //console.log(value.properties.KABKOT); --- TEST CONSOLE
       var dataKabkot = (value.properties.KABKOT);
       var jumlahKabkot = (index);
       //console.log(jumlahKabkot);


        //LOAD VARIABLE INTO SELECT OPTION
        ele.innerHTML = ele.innerHTML +'<option value="' + index + '">' + dataKabkot + '</option>';

      });
    }
  });

};

//============================================================================================================
//MASUKIN DATA KABUPATEN-KOTA KE LIST OPTION FORM
function populateKabkot1() {
  var ele = document.getElementById("inputGroupKabkot2");
  /*  TUTORIAL JQUERY LOAD JSON
  $.getJSON("/GeoJSON/UMKSBHJawa.geojson", function(data) {
    console.log(data.features[100].properties.KABKOT);
  });
  */
 //LOAD JSON INTO VARIABLE
 $.ajax({
   url: "https://louislugas.github.io/umk-sbh-jawa-map/GeoJSON/UMKSBHJawa.geojson",
   dataType:  "json",
   type: "get",
   cache: false,
   success: function(data) {
     $(data.features).each(function(index, value) {
       //console.log(value.properties.KABKOT); --- TEST CONSOLE
       var dataKabkot = (value.properties.KABKOT);
       var jumlahKabkot = (index);
       //console.log(jumlahKabkot);


        //LOAD VARIABLE INTO SELECT OPTION
        ele.innerHTML = ele.innerHTML +'<option value="' + index + '">' + dataKabkot + '</option>';

      });
    }
  });

};


//============================================================================================================
// AMBIL DATA DARI FORM
function inputDataform(){
  var eleKabkot = document.getElementById("inputGroupKabkot");
  var eleDewasa = document.getElementById('inputGroupDewasa');
  var eleAnak = document.getElementById("inputGroupAnak");

  var inputDewasa = parseInt(eleDewasa.options[eleDewasa.selectedIndex].value,10);
//  console.log(inputDewasa);
  biayaDewasa = inputDewasa;
  if ( inputDewasa == 3 ) {
    umkDewasa = 2;
  } else {
    umkDewasa = 1;
  };
  if ( inputDewasa == 3 ) {
    biayaDewasa = 2;
  } else if ( inputDewasa == 2 ) {
    biayaDewasa = 2;
  } else {
    biayaDewasa = 1;
  };
  console.log(umkDewasa);
  console.log(biayaDewasa);

  var inputAnak = parseInt(eleAnak.options[eleAnak.selectedIndex].value,10);
  //console.log(inputAnak);
  biayaAnak = inputAnak;
  console.log(biayaAnak);

  var inputKabkot = parseInt(eleKabkot.options[eleKabkot.selectedIndex].value,10);
  console.log(inputKabkot);

  var anchorPoint;

  if (inputDewasa == 1 && inputAnak == 0) {document.getElementById("family").src = "Icon-08.svg";}
  else if (inputDewasa == 1 && inputAnak == 1) {document.getElementById("family").src = "Icon-07.svg";}
  else if (inputDewasa == 1 && inputAnak == 2) {document.getElementById("family").src = "Icon-06.svg";}
  else if (inputDewasa == 1 && inputAnak == 3) {document.getElementById("family").src = "Icon-05.svg";}
  else if (inputDewasa == 2 && inputAnak == 0) {document.getElementById("family").src = "Icon-01.svg";}
  else if (inputDewasa == 2 && inputAnak == 1) {document.getElementById("family").src = "Icon-02.svg";}
  else if (inputDewasa == 2 && inputAnak == 2) {document.getElementById("family").src = "Icon-03.svg";}
  else if (inputDewasa == 2 && inputAnak == 3) {document.getElementById("family").src = "Icon-04.svg";}
  else if (inputDewasa == 3 && inputAnak == 0) {document.getElementById("family").src = "Icon-01.svg";}
  else if (inputDewasa == 3 && inputAnak == 1) {document.getElementById("family").src = "Icon-02.svg";}
  else if (inputDewasa == 3 && inputAnak == 2) {document.getElementById("family").src = "Icon-03.svg";}
  else if (inputDewasa == 3 && inputAnak == 3) {document.getElementById("family").src = "Icon-04.svg";};

  var umkKabkot;
  var pendaptanKabkot;
  var biayaKabkot;
  var biayaTotal;
  var selisih;
  var kabKot;
  var provinsi;
  var header;

  d3.json(url).then(function(dataset){

    formatNum = d3.format(',d');

    upah = dataset.features.map(function (d) { return d.properties.UMK2020;});

    biayaHidup = dataset.features.map(function (d) { return d.properties.GRADSBHINT;});

    selisih = dataset.features.map(function (d) { return d.properties.UMK2020 - d.properties.GRADSBHINT;});
    selisihFinal = dataset.features.map(function (d) { return (d.properties.UMK2020 * umkDewasa) - ((d.properties.GRADSBHINT * biayaDewasa) +(d.properties.GRADSBHINT * biayaAnak));});
    console.log(selisihFinal);

    var prov = dataset.features.map(function (d) { return d.properties.PROVINSI;});
    var kot = dataset.features.map(function (d) { return d.properties.KABKOT;});

    upahMin = d3.min(upah);
    upahMax = d3.max(upah);
    selisihMin = d3.min(selisihFinal);
    selisihMax = d3.max(selisihFinal)

    console.log(selisihMin);
    console.log(selisihMax);

    scaleWarna = d3.scaleLinear()
      .range(["red","yellow","green"])
      .domain([selisihMin,0,5000000])

    areas
      .transition()
      .duration(750)
      .style("fill",function(d,i) {return scaleWarna(selisihFinal[i]); })

  });

  //DATA PRINT
  $.ajax({
    url: "https://louislugas.github.io/umk-sbh-jawa-map/GeoJSON/UMKSBHJawa.geojson",
    dataType:  "json",
    type: "get",
    cache: false,
    success: function(data) {
      console.log(data.features[inputKabkot].properties.KABKOT);

      umkKabkot = (data.features[inputKabkot].properties.UMK2020);
      console.log(umkKabkot);

      pendapatanKabkot = (umkKabkot * umkDewasa);

      biayaKabkot = (data.features[inputKabkot].properties.GRADSBHINT);
      console.log(biayaKabkot);

      biayaTotal = (biayaKabkot*(biayaDewasa+biayaAnak));

      selisih = ((umkKabkot*umkDewasa)-biayaTotal);
      console.log((umkKabkot*umkDewasa)-(biayaKabkot*(biayaDewasa+biayaAnak)));

      provinsi = (data.features[inputKabkot].properties.PROVINSI);
      kabKot = (data.features[inputKabkot].properties.KABKOT);
      console.log(provinsi);
      console.log(kabKot);

      if (selisih < 0) {
        document.getElementById("data-selisih").style.color = "red";
      } else {
        document.getElementById("data-selisih").style.color = "green";
      }

      if (selisih < 0) {
        document.getElementById("family-image-container").style.background = "salmon";
      } else {
        document.getElementById("family-image-container").style.background = "lightgreen";
      }

      var a = (new Intl.NumberFormat(['ban', 'id']).format(pendapatanKabkot));
      var b = (new Intl.NumberFormat(['ban', 'id']).format(biayaTotal));
      var c = (new Intl.NumberFormat(['ban', 'id']).format(selisih));
      console.log(a);
      console.log(b);
      console.log(c);

      $("div.header-kabkot").text(provinsi + ", " + kabKot);
      $("#data-umk").text("Rp"+a);
      $("#data-biayahidup").text("Rp"+b);
      $("#data-selisih").text("Rp"+c);
     }
   });

};

//============================================================================================================
// AMBIL DATA DARI FORM
function inputDataform1(){
  var eleKabkot = document.getElementById("inputGroupKabkot2");
  var eleDewasa = document.getElementById('inputGroupDewasa2');
  var eleAnak = document.getElementById("inputGroupAnak2");

  var inputDewasa = parseInt(eleDewasa.options[eleDewasa.selectedIndex].value,10);
//  console.log(inputDewasa);
  biayaDewasa = inputDewasa;
  if ( inputDewasa == 3 ) {
    umkDewasa = 2;
  } else {
    umkDewasa = 1;
  };
  if ( inputDewasa == 3 ) {
    biayaDewasa = 2;
  } else if ( inputDewasa == 2 ) {
    biayaDewasa = 2;
  } else {
    biayaDewasa = 1;
  };
  console.log(umkDewasa);
  console.log(biayaDewasa);

  var inputAnak = parseInt(eleAnak.options[eleAnak.selectedIndex].value,10);
  //console.log(inputAnak);
  biayaAnak = inputAnak;
  console.log(biayaAnak);

  var inputKabkot = parseInt(eleKabkot.options[eleKabkot.selectedIndex].value,10);
  console.log(inputKabkot);

  var anchorPoint;

  if (inputDewasa == 1 && inputAnak == 0) {document.getElementById("family").src = "Icon-08.svg";}
  else if (inputDewasa == 1 && inputAnak == 1) {document.getElementById("family").src = "Icon-07.svg";}
  else if (inputDewasa == 1 && inputAnak == 2) {document.getElementById("family").src = "Icon-06.svg";}
  else if (inputDewasa == 1 && inputAnak == 3) {document.getElementById("family").src = "Icon-05.svg";}
  else if (inputDewasa == 2 && inputAnak == 0) {document.getElementById("family").src = "Icon-01.svg";}
  else if (inputDewasa == 2 && inputAnak == 1) {document.getElementById("family").src = "Icon-02.svg";}
  else if (inputDewasa == 2 && inputAnak == 2) {document.getElementById("family").src = "Icon-03.svg";}
  else if (inputDewasa == 2 && inputAnak == 3) {document.getElementById("family").src = "Icon-04.svg";}
  else if (inputDewasa == 3 && inputAnak == 0) {document.getElementById("family").src = "Icon-01.svg";}
  else if (inputDewasa == 3 && inputAnak == 1) {document.getElementById("family").src = "Icon-02.svg";}
  else if (inputDewasa == 3 && inputAnak == 2) {document.getElementById("family").src = "Icon-03.svg";}
  else if (inputDewasa == 3 && inputAnak == 3) {document.getElementById("family").src = "Icon-04.svg";};

  var umkKabkot;
  var pendaptanKabkot;
  var biayaKabkot;
  var biayaTotal;
  var selisih;
  var kabKot;
  var provinsi;
  var header;

  d3.json(url).then(function(dataset){

    formatNum = d3.format(',d');

    upah = dataset.features.map(function (d) { return d.properties.UMK2020;});

    biayaHidup = dataset.features.map(function (d) { return d.properties.GRADSBHINT;});

    selisih = dataset.features.map(function (d) { return d.properties.UMK2020 - d.properties.GRADSBHINT;});
    selisihFinal = dataset.features.map(function (d) { return (d.properties.UMK2020 * umkDewasa) - ((d.properties.GRADSBHINT * biayaDewasa) +(d.properties.GRADSBHINT * biayaAnak));});
    console.log(selisihFinal);

    var prov = dataset.features.map(function (d) { return d.properties.PROVINSI;});
    var kot = dataset.features.map(function (d) { return d.properties.KABKOT;});

    upahMin = d3.min(upah);
    upahMax = d3.max(upah);
    selisihMin = d3.min(selisihFinal);
    selisihMax = d3.max(selisihFinal)

    scaleWarna = d3.scaleLinear()
      .range(["red","yellow","green"])
      .domain([selisihMin,0,5000000])

    areas
      .transition()
      .duration(750)
      .style("fill",function(d,i) {return scaleWarna(selisihFinal[i]); })
  });

  //DATA PRINT
  $.ajax({
    url: "https://louislugas.github.io/umk-sbh-jawa-map/GeoJSON/UMKSBHJawa.geojson",
    dataType:  "json",
    type: "get",
    cache: false,
    success: function(data) {
      console.log(data.features[inputKabkot].properties.KABKOT);

      umkKabkot = (data.features[inputKabkot].properties.UMK2020);
      console.log(umkKabkot);

      pendapatanKabkot = (umkKabkot * umkDewasa);

      biayaKabkot = (data.features[inputKabkot].properties.GRADSBHINT);
      console.log(biayaKabkot);

      biayaTotal = (biayaKabkot*(biayaDewasa+biayaAnak));

      selisih = ((umkKabkot*umkDewasa)-biayaTotal);
      console.log((umkKabkot*umkDewasa)-(biayaKabkot*(biayaDewasa+biayaAnak)));

      provinsi = (data.features[inputKabkot].properties.PROVINSI);
      kabKot = (data.features[inputKabkot].properties.KABKOT);
      console.log(provinsi);
      console.log(kabKot);

      if (selisih < 0) {
        document.getElementById("data-selisih").style.color = "red";
      } else {
        document.getElementById("data-selisih").style.color = "green";
      }

      if (selisih < 0) {
        document.getElementById("family-image-container").style.background = "salmon";
      } else {
        document.getElementById("family-image-container").style.background = "lightgreen";
      }

      var a = (new Intl.NumberFormat(['ban', 'id']).format(pendapatanKabkot));
      var b = (new Intl.NumberFormat(['ban', 'id']).format(biayaTotal));
      var c = (new Intl.NumberFormat(['ban', 'id']).format(selisih));
      console.log(a);
      console.log(b);
      console.log(c);

      $("div.header-kabkot").text(provinsi + ", " + kabKot);
      $("#data-umk").text("Rp"+a);
      $("#data-biayahidup").text("Rp"+b);
      $("#data-selisih").text("Rp"+c);
     }
   });

};

//============================================================================================================
//LOAD MAP DATA

d3.json(url).then(function(dataset){

  formatNum = d3.format(',d');

  upah = dataset.features.map(function (d) { return d.properties.UMK2020;});
  upahFinal = dataset.features.map(function (d) { return d.properties.UMK2020 * umkDewasa;});

  biayaHidup = dataset.features.map(function (d) { return d.properties.GRADSBHINT;});
  biayaHidupFinal = dataset.features.map(function (d) { return (d.properties.GRADSBHINT * biayaDewasa) +(d.properties.GRADSBHINT * biayaAnak);});

  selisih = dataset.features.map(function (d) { return d.properties.UMK2020 - d.properties.GRADSBHINT;});
  selisihFinal = dataset.features.map(function (d) { return (d.properties.UMK2020 * umkDewasa) - ((d.properties.GRADSBHINT * biayaDewasa) +(d.properties.GRADSBHINT * biayaAnak));});
  console.log(selisihFinal);

  var prov = dataset.features.map(function (d) { return d.properties.PROVINSI;});
  var kot = dataset.features.map(function (d) { return d.properties.KABKOT;});

  upahMin = d3.min(upah);
  upahMax = d3.max(upah);
  selisihMin = d3.min(selisih);
  selisihMax = d3.max(selisih);


  console.log(biayaHidup);
  console.log(selisih);
  console.log(upahMin);
  console.log(upahMax);
  console.log(selisihMin);
  console.log(selisihMax);
  console.log(upah);


  scaleWarna = d3.scaleLinear()
    .range(["red","yellow","green"])
    .domain([selisihMin,0,5000000])

  group = canvas.selectAll("g")
    .data(dataset.features)
    .enter()
    .append("g");

  areas = group.append("path")
    .attr("d", path)
    .attr("class","area")
    .style("fill","lightgrey")
    .style("stroke","grey")
    .on("mouseover", function(d,i) {
      d3.select(this)
        .transition()
        .duration(100)
        .style("stroke","black");
        //.style("fill",function(d){return d3.rgb(d3.select(this).style("fill")).darker(0.5);});
      div.transition()
        .duration(200)
        .style("opacity", .9);
      div.style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY - 28) + "px");
      div.html(prov[i] + "<br/>" + "<strong>" + kot[i] + "</strong>" + "<br/>");
      })
    .on("mouseout", function(d) {
        div.transition()
            .duration(500)
            .style("opacity", 0)
        d3.select(this)
          .transition()
          .duration(100)
          .style("stroke","grey");
          //.style("fill",function(d){return d3.rgb(d3.select(this).style("fill")).brighter(0.1);});
        });


  /*group.append("text")
    .attr("x", function(d){return path.centroid(d)[0]; })
    .attr("y", function(d){return path.centroid(d)[1]; })
    .text(function (d,i) { return upah[i];})
    .style("fill","black");*/

});

/*d3.json(url).then(function(error, d){
  if (error) console.log(error);

  console.log("geojson", d);

  svg.selectAll("g")
    .data(d.features)
    .enter()
    .append("g");

  svg.selectAll("path")
    .data(d.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("fill","pink");

});
*/

var data = [-10000000,-8000000,-6000000,-4000000,-2000000, 0, 1000000,2000000,3000000,4000000,5000000];
console.log(data);

var color = d3.scaleLinear()
  .range(["red","yellow","green"])
  .domain([-10000000, 0, 5000000]);

// Modified Legend Code from Mike Bostock: http://bl.ocks.org/mbostock/3888852
var legend = d3.select("#legend").append("svg")
  .attr("width", 140)
  .attr("height", 200)
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

legend.append("text")
  .data(d3.format(",")(data))
  .attr("x", 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .text(function(d) { return d; });
