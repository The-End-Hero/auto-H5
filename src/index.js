/**
 * Created by hasee on 2017/4/16.
 */
require('./index.scss')
$(function () {
    function synchronization() {
        localStorage.setItem('auto_h5',created_data)
    }
    // 创造div的代号
    var created_num = 0;
    var created_data= {
        created_div:[],
        type:'pc'
    }
    $('#pc').on('click', function () {
        $('.create').css({
            width: '70%'
        })
        $('.create').html('')
    })
    $('#mobile').on('click', function () {
        $('.create').css({
            width: '50%'
        })
        $('.create').html('')
    })

    $('#add').on('click', function () {
        ++created_num
        var str = "<div style=\"width:100%;position:relative\" data-id=\""+created_num+"\" class=\"created_div\" id=\"created_div_" + created_num + "\"><span class=\"uselessspan\">" + created_num + "</span></div>"
        $('#add_cut').before(str)
        var strVar = "";
        strVar += "<div class=\"contrl created_div_"+created_num+"\">\n";
        strVar += "            <div class=\"num\">" + created_num + "<\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName" + created_num + "\">设置背景图片:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName" + created_num + "\" placeholder=\"\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <button type=\"button\" class=\"btn btn-primary\" data-id=\"created_div_" + created_num + "\">确认<\/button>\n";
        strVar += "        <\/div>\n";
        $('.left_contrl').append(strVar)
        created_data.created_div[created_num-1]={id:created_num,divs:[]}
        console.log(created_data)
    })
    $('#cut').on('click', function () {
        $('.contrl:nth-of-type(' + created_num + ')').remove()
        created_data.created_div.splice(created_num-1,1)
        console.log(created_data)
        --created_num
        $('#add_cut').prev().remove()
    })
    $(document).on('click', '.created_div', function () {
        console.log(this.style)
    })
    $(document).on('keyup', '.form-control', function () {
        $(this).parent().next().attr('data-background', $(this).val())
        console.log($(this).parent().next())
    })
    /**btn公用方法
     * 外层div创建img-->背景图片
     * 
     *
     *
     */
    $(document).on('click', '.btn', function () {
        // btn点击  data-id 目标元素id
        var id = $(this).attr('data-id')
        if($(this).attr('data-background')){//如果有data-background属性-->生成img标签
            var background = $(this).attr('data-background')
            console.log($('#' + id).children('img').length)
            if ($('#' + id).children('img').length > 0) {
                $('#' + id).children('img').attr('src', background)
                return false
            }
            $('#' + id).append("        <img src=\"" + background + "\" style=\"display: block; width: 100%\" alt=\"\">\n")
        }


    })
    $(document).on("contextmenu", function (e) {
        return false;
    });

    $(document).on("mousedown", '.created_div', function (e) {
        e.stopPropagation();
        e.preventDefault()
        $(document).off('mousedown', '#created_click_a', function () {})
        if (e.which == 3) {
            var $_this = $(this)
            $('.contextright_3').remove()
            function newTag() {
                var strVar = "";
                strVar += "<div class=\"contextright_3\"style=\"position:absolute;left: " + e.offsetX + "px; top: " + e.offsetY + "px;\">\n";
                strVar += "            <div id=\"created_click_a\">添加点击区域<\/div>\n";
                strVar += "            <div id=\"created_content_div\">添加内容区域<\/div>\n";
                strVar += "        <\/div>\n";
                $_this.append(strVar)
            }
            if ($(this).children('.contextright_3').length > 0) {
                $('.contextright_3').remove()
                newTag()
            } else {
                newTag()
            }

        } else if (e.which == 1) {
            $('.contextright_3').remove()
        }
    });
    // 新增点击区域
    $(document).on('mousedown', '#created_click_a', function (e) {
        e.stopPropagation();
        e.preventDefault()
        // 更新data
        var length = created_data.created_div[$(this).parent().parent().attr('data-id')-1].divs.length||0
        created_data.created_div[$(this).parent().parent().attr('data-id')-1].divs.push({id:length,type:'a'})


        // 新增点击a标签区域
        $(this).parent().parent().append('<a class="blank_a" style="position: absolute;left: 50%; z-index: 10;"></a>')


        //tab新增更改属性列表
        var strVar = "";
        strVar += "<div class=\"num\">1-1<\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName2\">宽度:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName2\" placeholder=\"请使用%\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName2\">高度:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName2\" placeholder=\"请使用%\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName2\">距离左边:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName2\" placeholder=\"请使用%\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName2\">距离顶部:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName2\" placeholder=\"请使用%\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName2\">跳转地址:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName2\" placeholder=\"请使用%\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <div class=\"checkbox\">\n";
        strVar += "                <label>\n";
        strVar += "                    <input type=\"checkbox\">跳转是否新建页面(默认不新建)\n";
        strVar += "                <\/label>\n";
        strVar += "            <\/div>\n";
        strVar += "            <button type=\"button\" class=\"btn btn-primary\">确认<\/button>\n";
        $('.created_div_'+created_num).append(strVar)
    })
})
