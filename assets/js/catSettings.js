
var colors = Object.values(allColors())

var defaultDNA = {
    //Colors
    "headcolor" : 10,
    "mouthColor" : 13,
    "eyesColor" : 96,
    "earsColor" : 10,
    //Cattributes
    "eyesShape" : 1,
    "decorationPattern" : 1,
    "decorationMidcolor" : 13,
    "decorationSidescolor" : 13,
    "animation" :  1,
    "lastNum" :  1
    }

// when page loads
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);

  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnadecoration').html(defaultDNA.decorationPattern);
  $('#dnadecorationMid').html(defaultDNA.decorationMidcolor);
  $('#dnadecorationSides').html(defaultDNA.decorationSidescolor);
  $('#dnaanimation').html(defaultDNA.animation);
  $('#dnaspecial').html(defaultDNA.lastNum);

  renderCat(defaultDNA);
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnadecoration').html()
    dna += $('#dnadecorationMid').html()
    dna += $('#dnadecorationSides').html()
    dna += $('#dnaanimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    eyeVariation(dna.eyesShape)
    decorationVariation(dna.decorationPattern)
    midColor(colors[dna.decorationMidcolor],dna.decorationMidcolor)
    sideColor(colors[dna.decorationSidescolor],dna.decorationSidescolor)

    $('#bodycolor').val(dna.headcolor)
    $('#mouthcolor').val(dna.mouthColor)
    $('#eyescolor').val(dna.eyesColor)
    $('#earscolor').val(dna.earsColor)

    $('#eyeshape').val(dna.eyesShape)
    $('#patternshape').val(dna.decorationPattern)
    $('#midcolor').val(dna.decorationMidcolor)
    $('#sidecolor').val(dna.decorationSidescolor)
}

// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthcolor').change(()=>{
  var colorVal = $('#mouthcolor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyescolor').change(()=>{
  var colorVal = $('#eyescolor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earscolor').change(()=>{
  var colorVal = $('#earscolor').val()
  earsColor(colors[colorVal],colorVal)
})

/**
 * Pattern colors
 */
$('#sidecolor').change(()=>{
  var colorVal = $('#sidecolor').val()
  sideColor(colors[colorVal],colorVal)
})

$('#midcolor').change(()=>{
  var colorVal = $('#midcolor').val()
  midColor(colors[colorVal],colorVal)
})

// Listener for the eyeshape etc.
$('#eyeshape').change(() => {
  var shape = parseInt($('#eyeshape').val())
  eyeVariation(shape)
})

$('#patternshape').change(() => {
  var shape = parseInt($('#patternshape').val())
  decorationVariation(shape)
})


