/**
 * Created by hasee on 2017/4/16.
 */
require('./index.scss')
$(function () {
    var created_num = 0;
    $('#pc').on('click',function () {
        $('.create').css({
            width:'70%'
        })
        $('.create').html('')
    })
    $('#mobile').on('click',function () {
        $('.create').css({
            width:'50%'
        })
        $('.create').html('')
    })
    $('#add').on('click',function () {
        ++created_num
        var str = '<div style=width:100%; class="created_div" id="created_div_'+created_num+'">'+created_num+'</div>'
        $('#add_cut').before(str)
        var strVar = "";
        strVar += "<div class=\"contrl\">\n";
        strVar += "            <div class=\"num\">"+created_num+"<\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName"+created_num+"\">设置背景图片:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control\" id=\"exampleInputName"+created_num+"\" placeholder=\"\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <button type=\"button\" class=\"btn btn-primary\" data-id=\"created_div_"+created_num+"\">确认<\/button>\n";
        strVar += "        <\/div>\n";
        $('.left_contrl').append(strVar)
    })
    $('#cut').on('click',function () {
        --created_num
        $('#add_cut').prev().remove()
    })
    $(document).on('click','.created_div', function () {
        console.log(this.style )
    })
    $(document).on('keyup','.form-control',function () {
        $(this).parent().next().attr('data-background',$(this).val())
        console.log($(this).parent().next())
    })
    $(document).on('click','.btn',function () {
        //alert(this)
        var id =$(this).attr('data-id')
        var background=$(this).attr('data-background')
        $('#'+id).append( "        <img src=\""+background+"\" style=\"display: block; width: 100%\" alt=\"\">\n")
    })




})
