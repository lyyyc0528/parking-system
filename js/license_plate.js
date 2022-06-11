$(function () {

    $('.vanish').click(function () {
        $('.footer .footer_text').hide()
        $(".addpark").css({ 'top': '120px' })
    })

    $('.header .inp').click(function () {
        var i = $(this).index()//获取具体元素下标
        $(".footer>.bx>div").hide()//派他思想，让所有元素隐藏
        $(".footer>.bx>div").eq(i).show()//让所有元素显示，eq(i)查找下标为i的元素。
        $(".addpark").css({ 'top': '10px' })
        $(".addpark").css({ 'z-index': '10' })
        
    })




    $(".footer .footer_text1 .inp").click(function () {
        $('.header .inpText1').val($(this).val());
        console.log(1)
    })

    $(".footer .footer_text2 .inp").click(function () {
        $('.header .inpText2').val($(this).val());
    })

    $(".footer .footer_text3 .inp").click(function () {
        $('.header .inpText3').val($(this).val());
    })

    $(".footer .footer_text4 .inp").click(function () {
        $('.header .inpText4').val($(this).val());
    })

    $(".footer .footer_text5 .inp").click(function () {
        $('.header .inpText5').val($(this).val());
    })

    $(".footer .footer_text6 .inp").click(function () {
        $('.header .inpText6').val($(this).val());
    })

    $(".footer .footer_text7 .inp").click(function () {
        $('.header .inpText7').val($(this).val());
    })

    $(".footer .footer_text8 .inp").click(function () {
        $('.header .inpText8').val($(this).val());
    })



    
    
    
    
    

    













})