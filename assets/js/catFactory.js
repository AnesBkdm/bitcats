
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

function headColor(color,code) {
    $('.cat__head, .cat__chest').css('background', '#' + color)
    $('#headcode').html('code: '+code)
    $('#dnabody').html(code)
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)  
    $('#mouthcode').html('code: '+code) 
    $('#dnamouth').html(code) 
}

function eyesColor(color,code) {
    $('.cat__eye span').css('background', '#' + color)
    $('#eyescode').html('code: '+code) 
    $('#dnaeyes').html(code) 
}

function earsColor(color,code) {
    $('.cat__ear--left, .cat__ear--right, .cat__paw-left, .cat__paw-right, .cat__paw-left_inner, .cat__paw-right_inner').css('background', '#' + color) 
    $('#earscode').html('code: '+code) 
    $('#dnaears').html(code) 
}


function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        
        case 2:
            normalEyes()
            chillEyes()
            $('#eyeName').html('Chill')
            break
        
        case 3:
            normalEyes()
            upEyes()
            $('#eyeName').html('Up')
            break
        
        case 4:
            normalEyes()
            leftEyes()
            $('#eyeName').html('Left')
            break
        
        case 5:
            normalEyes()
            rightEyes()
            $('#eyeName').html('Right')
            break
        
        case 6:
            normalEyes()
            zombieEyes()
            $('#eyeName').html('Zombie')
            break
    }
}

function decorationVariation(num) {

    $('#dnadecoration').html(num)

    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
        
        case 2:
            $('#decorationName').html('Chill')
            normaldecoration()
            break

        case 3:
            $('#decorationName').html('Chill')
            normaldecoration()
            break
    }
}

var lastEyeColor = $('.cat__eye span').css('background-color');

async function normalEyes() {
    // await $('.cat__eye span').css('background', '##ffffff');
    await $('.cat__eye').find('span').css('border', 'none');
}

async function chillEyes() {
    await $('.cat__eye').find('span').css('border-top', '15px solid')
}

async function upEyes() {
    await $('.cat__eye').find('span').css('border-bottom', '15px solid')
}

async function leftEyes() {
    await $('.cat__eye').find('span').css('border-left', '15px solid')
}

async function rightEyes() {
    await $('.cat__eye').find('span').css('border-right', '15px solid')
}

async function zombieEyes() {
    await $('.cat__eye').find('span').css('border-top', '40px solid')
}

async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
