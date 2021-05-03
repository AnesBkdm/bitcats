
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

function sideColor(color,code) {
    $('.cat__head-dots_first').css('background', '#' + color)
    $('.cat__head-dots_second').css('background', '#' + color)
    $('#sidecode').html('code: '+code)
    $('#dnadecorationSides').html(code)
}

function midColor(color,code) {
    $('.cat__head-dots').css('background', '#' + color)
    $('#midcode').html('code: '+code)
    $('#dnadecorationMid').html(code)
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
            $('#decorationName').html('Default')
            normaldecoration()
            break
        
        case 2:
            $('#decorationName').html('Out')
            outdecoration()
            break

        case 3:
            $('#decorationName').html('In')
            indecoration()
            break
    }
}

function animationVariation(num) {

    $('#dnadanimation').html(num)

    switch (num) {
        case 1:
            $('#animationName').html('No animation')
            nothingAnimation()
            break
        
        case 2:
            $('#animationName').html('Rotation')
            rotationAnimation()
            break

        case 3:
            $('#animationName').html('Yes')
            yesAnimation()
            break
        
        case 4:
            $('#animationName').html('No')
            noAnimation()
            break
    }
}

// var lastEyeColor = $('.cat__eye span').css('background-color');

/**
 * Eyes variation
 */
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


/**
 * Decoration patterns
 */
async function normaldecoration() {
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function outdecoration() {
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function indecoration() {
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-45deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

/**
 * Animations patterns
 */
async function resetAnimation() {
    $("#head").removeClass('nothingHead');
    $("#head").removeClass('rotationHead');
    $("#head").removeClass('yesHead');
    $("#head").removeClass('noHead');

    $("#cat__ear").removeClass('nothingHead');
    $("#cat__ear").removeClass('rotationHead');
    $("#cat__ear").removeClass('yesHead');
    $("#cat__ear").removeClass('noHead');
}

async function nothingAnimation() {
    resetAnimation();
    $('#head').addClass('nothingHead');
    $('#cat__ear').addClass('nothingHead');
}

async function rotationAnimation() {
    resetAnimation();
    $('#head').addClass('rotateHead');
    $('#cat__ear').addClass('rotationHead');
}

async function yesAnimation() {
    resetAnimation();
    $('#head').addClass('yesHead');
    // $('#cat__ear').addClass('yesHead');
}

async function noAnimation() {
    resetAnimation();
    $('#head').addClass('noHead');
    // $('#cat__ear').addClass('noHead');
}
