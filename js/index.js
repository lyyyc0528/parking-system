$(function () {

    $.get("http://1.14.68.137:8000/api/v0/owner/",function(res){
    console.log(res)
    })

    var global_data = null;
    var global_page_number = 1;
    var global_park_state = 0;

    var tab = new Switch_Tab()
    $('.stop_car').append(tab.switchbtn)

	$(function() {
        // 分页
        var paging = $(".paging");
        var last_li = $(".paging_ul").children().last();

        // 处理所有事件
		bingAllEvents();

        $.get('http://1.14.68.137:8000/api/v0/owner/', function(res) {
       
            // 渲染数据
            renderOwnerTemplate(res.results);
    
            var count = res.count;
    
            if (count < 10) {
                paging.hide();
            } else { 
                paging.show();
                page_number = Math.ceil(count / 10);
                for (var i = 0; i < page_number; i++) {
                    if (i == 0) {
                        var li = $("<li>").addClass("active");
                    } else {
                        var li = $("<li>");
                    }

                    $("<a>").attr("href", "javascript:;").text(i + 1).appendTo(li);
                    last_li.before(li);
    
                    li.click(function() {
                        $(this).addClass("active")
                        $(this).siblings().removeClass();
    
                        var page_number = +$(this).text();
                        global_page_number = page_number;
                        rerenderOwnerTemplate(page_number); 
                    })

                }

                $('.previous').click(function () {
                    var pag = { page: global_page_number }
                    if (pag.page == 1) {
                        pag.page = 1
                    }else if (pag.page >=2) {
                        pag.page--
                    var page_number = pag.page;
                    global_page_number = page_number;
                    $.get('http://1.14.68.137:8000/api/v0/owner/', pag, (data) => {
                        let result = template('tpl-owner', data.results);
                        li.prev().addClass("active")
                        li.prev().siblings().removeClass();
                        $('tbody').html(result)
                        rerenderOwnerTemplate(page_number)
                        console.log(global_page_number)
                    })
                    }
                })
            
                $('.next').click(function () {
                    var nextpage = ++global_page_number;
                    if (nextpage >= page_number) {
                        nextpage = page_number
                    }
                    rerenderOwnerTemplate(nextpage);
                    global_page_number = page_number
                })   
                               
            }
        })
     

        //编辑数据
        $('#edit_enter').click(function () {
            console.log(1)
            // 1. 拿ID
            var id = editAdd.find("#username")[0].dataset.id
            console.log(id)
            var name = editAdd.find("#username").val()
            var home_number = editAdd.find("#home_number").val()
            var phone_number = editAdd.find("#phone_number").val()
            var park_lot = editAdd.find("#park_lot").val()
            var park_state = tab.state;

            $.ajax({
                type: 'PUT',
                url: "http://1.14.68.137:8000/api/v0/owner/" + id + "/",
                data: {
                    name,
                    home_number,
                    phone_number,
                    park_lot,
                     park_state: Number(park_state)
                },
                success() {
                    rerenderOwnerTemplate(global_page_number)
                    $('#edit-add').hide();
                    alert('编辑成功')
                },
                error() {
                    alert('编辑失败,请联系客服')
                }
            })
        })


    })

    var add = $("#add") //获取新增数据
    var editAdd = $("#edit-add") //获取编辑数据
    //新增数据显示
    $(".newadd").click(function() {
    add.show();
    })

    //新增数据隐藏
    $('#cancel').click(function() {
        add.hide();
    })

    //编辑数据隐藏
    $('#edit_cancel').click(function () {
        editAdd.hide();
    })

    //新增数据
    $("#enter").click(function () {
        $.ajax({
            type: "POST",
            url: "http://1.14.68.137:8000/api/v0/owner/",
            data: {
                name: $('#username').val(),
                home_number: $("#home_number").val(),
                phone_number: $("#phone_number").val(),
                park_lot: $("#park_lot").val(),
                park_state: $("#park_state").val()
            },
            success(res) {
                alert('添加成功')
                // location.reload(true)
                add.hide()
                console.log(res)
            },
            error() {
                alert('添加失败,请联系客服')
            }
        })
        $.get("http://1.14.68.137:8000/api/v0/owner/" + page_number + '/', function (res) {
           
            console.log(res.results);
        })
    })

    // 封装函数
    function renderOwnerTemplate(data) {
        global_data = data;
        var renderHTML = template('tpl-owner', data)
        $("tbody").html(renderHTML);
    }

    function rerenderOwnerTemplate(page_number) {
        var url = 'http://1.14.68.137:8000/api/v0/owner/';
        if (page_number) url += "?page=" + page_number;
        $.get(url, function(res) {
            renderOwnerTemplate(res.results);
        })
    }

    // 处理时间
    template.defaults.imports.dateFormat = function (date) {
        var date = new Date(date)
        var y = date.getFullYear()
        var M = date.getMonth() + 1
        var d = date.getDate()
        var h = date.getHours()
        var f = date.getMinutes()
        var m = date.getSeconds()
        return y + '-' + M + '-' + d + ' ' + h + ':' + f + ':' + m
    };

    // 显示图片
    template.defaults.imports.a = function(str){
        if(str){
            return str.car_img
        }
    };

    //事件委托
    function bingAllEvents() {
        //删数据
        $("tbody").click(function(e) {
            if ($(e.target).hasClass("btn-danger")) {
                $(".again-btnDanger").show()
            }

            $(".btn-delet").click(function() { 
                console.log(1)
                var index = +e.target.dataset.index;
                var id = global_data[index].id;
                deleteOwner(id, function () {
                    rerenderOwnerTemplate(global_page_number);
                    $(".again-btnDanger").hide()
                    alert("删除成功");
                });
            })
                
            if ($(e.target).hasClass('edit')) {
                var index = +e.target.dataset.index;
                var one_owner = global_data[index];

                editAdd.find("#username")[0].dataset.id = one_owner.id;
                editAdd.find("#username").val(one_owner.name)
                editAdd.find("#home_number").val(one_owner.home_number)
                editAdd.find("#phone_number").val(one_owner.phone_number)
                editAdd.find("#park_lot").val(one_owner.park_lot)
                

                if (one_owner.park_state == 0) {
                    tab.state = false;
                    tab.close()
                } else {
                    tab.state = true;
                    tab.open()
                }

                editAdd.show();
            }

        })
    }

  
    $(".btn-stop").click(function(){
        $(".again-btnDanger").hide()
    })

    function deleteOwner(id, success) {
        $.ajax({
            type: "DELETE",
            url: "http://1.14.68.137:8000/api/v0/owner/" + id,
            success: success
        })
    }



    //车牌号
    $('.inp').click(function(){
        if($(this).val()>1){
            
        }
    })



    enter.addEventListener('click', function (res) {
        console.log(res);
            let car_img = file.files[0];
            console.log(file.files[0]);

            let license = $('.inpText1').val()+$('.inpText2').val()+$('.inpText3').val()+$('.inpText4').val()+$('.inpText5').val()+$('.inpText6').val()+$('.inpText7').val();
            let owner = res.results.owner
            console.log(license)
            console.log(lowner)
           
            let formData = new FormData();
            formData.append('car_img', car_img);
            formData.append('license', license);
            formData.append('owner', owner);

            $.ajax({
                url: "http://1.14.68.137:8000/api/v0/license/",
                type: "POST",
                contentType: false,
                processData:false,
                data: formData,
                success(res) {
                    alert('添加成功')
                },
                error(res) { 
                    alert('添加失败,请联系客服')  
                } 

            })
            console.log(owner)
        })

    



        $('.header_but').click(function(){
            console.log(file.files[0]);
            console.log($('.inpText1').val()+$('.inpText2').val()+$('.inpText3').val()+$('.inpText4').val()+$('.inpText5').val()+$('.inpText6').val()+$('.inpText7').val())
        })
    
})