/**
 * Created by hasee on 2017/4/16.
 */
require('./index.scss')
$(function () {
    function synchronization() {
        localStorage.setItem('auto_h5',created_data)
    }

    /**创造div的代号
     * created_num--->控制最外层div
     *
     */

    var created_num = 0;
    var created_data= {
        created_div:[],
        type:'pc'
    }
    // Object.defineProperty(created_data.created_div,created_num,{
    //     set:function (newdata) {
    //
    //     },
    //     get:function () {
    //
    //     }
    // })
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
    // 添加模块
    $('#add').on('click', function () {
        ++created_num
        var str = "<div style=\"width:100%;position:relative\" data-id=\""+created_num+"\" class=\"created_div\" id=\"created_div_" + created_num + "\"><span class=\"uselessspan\">" + created_num + "</span></div>"
        $('#add_cut').before(str)
        var strVar = "";
        strVar += "<div class=\"contrl created_div_"+created_num+"\">\n";
        strVar += "            <div class=\"num\">" + created_num + "<\/div>\n";
        strVar += "            <div class=\"form-group\">\n";
        strVar += "                <label for=\"exampleInputName" + created_num + "\">设置背景图片:<\/label>\n";
        strVar += "                <input type=\"text\" class=\"form-control data-background\" id=\"exampleInputName" + created_num + "\" placeholder=\"\">\n";
        strVar += "            <\/div>\n";
        strVar += "            <button type=\"button\" class=\"btn btn-primary\" data-id=\"created_div_" + created_num + "\">确认<\/button>\n";
        strVar += "<\/div>\n";
        $('.left_contrl').append(strVar)
        created_data.created_div[created_num-1]={id:created_num,divs:[]}
        console.log(created_data)
    })
    // 删除模块
    $('#cut').on('click', function () {
        $('.contrl:nth-of-type(' + created_num + ')').remove()
        created_data.created_div.splice(created_num-1,1)
        console.log(created_data)
        --created_num
        $('#add_cut').prev().remove()
    })

    // $(document).on('click', '.created_div', function () {
    //     console.log(this.style)
    // })

    /**input公用事件
     *
      */
    $(document).on('keyup', '.form-control', function () {
        if($(this).hasClass('data-background')){
            $(this).parent().next().attr('data-background', $(this).val())
        }else if($(this).hasClass('data-width')){
            $(this).parent().next().attr('data-width', $(this).val())
        }else if($(this).hasClass('data-height')){
            $(this).parent().next().attr('data-height', $(this).val())
        }else if($(this).hasClass('data-left')){
            $(this).parent().next().attr('data-left', $(this).val())
        }else if($(this).hasClass('data-top')){
            $(this).parent().next().attr('data-top', $(this).val())
        }else if($(this).hasClass('data-href')){
            $(this).parent().next().attr('data-href', $(this).val())
        }

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
        const id = $(this).attr('data-id')
        //如果存在data-background属性-->生成img标签
        if($(this).attr('data-background')){
            var background = $(this).attr('data-background')
            console.log($('#' + id).children('img').length)
            if ($('#' + id).children('img').length > 0) {
                $('#' + id).children('img').attr('src', background)
                return false
            }
            $('#' + id).append("<img src=\"" + background + "\" style=\"display: block; width: 100%\" alt=\"\">\n")
        }
        if($(this).attr('data-width')&&$(this).attr('data-height')&&$(this).attr('data-left')&&$(this).attr('data-top')){
            const css = {
                width:$(this).attr('data-width')+'',
                height:$(this).attr('data-height')+'',
                left:$(this).attr('data-left')+'',
                top:$(this).attr('data-top')+'',
            }
            $('#' + id).css(css)
        }
        if($(this).attr('data-href')){
            $('#' + id).attr('href',$(this).attr('data-href'))
        }


    })

    // 阻止右键默认行为
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
                strVar += "<\/div>\n";
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
        console.log(created_data)

        /**  新增点击a标签区域
         * 1.是否新建页面跳转(默认新建)
         * 2.href的路径
         * 3.埋点自定义属性-->可以根据href路径判断生成
         */


        //tab新增更改属性列表
        let num_a = 1
        for (let i = 0; i < length; i++) {
            if(created_data.created_div[$(this).parent().parent().attr('data-id')-1].divs[i].type=='a'){
                ++num_a
            }
        }
        var num = $(this).parent().parent().attr('data-id')+'-'+num_a
        $(this).parent().parent().append("<a class=\"blank_a\" id=\"created_a_"+num+"\" target=\"_blank\" style=\"position: absolute;left: 50%; top: 0%;z-index: 10;\"><\/a>\n")
        var strVar = "";
        strVar += "<div class=\"num\">"+num+'-a'+"<\/div>\n";
        strVar += "<div class=\"form-group\">\n";
        strVar += "            <label>宽度:<\/label>\n";
        strVar += "            <input type=\"text\" class=\"form-control data-width\" placeholder=\"\">\n";
        strVar += "            <label>高度:<\/label>\n";
        strVar += "            <input type=\"text\" class=\"form-control data-height\" placeholder=\"\">\n";
        strVar += "            <label>距离左边:<\/label>\n";
        strVar += "            <input type=\"text\" class=\"form-control data-left\" placeholder=\"\">\n";
        strVar += "            <label>距离顶部:<\/label>\n";
        strVar += "            <input type=\"text\" class=\"form-control data-top\" placeholder=\"\">\n";
        strVar += "            <label>跳转地址:<\/label>\n";
        strVar += "            <input type=\"text\" class=\"form-control data-href\" placeholder=\"\">\n";
        strVar += "            <label>\n";
        strVar += "                <input type=\"checkbox\">跳转是否新建页面(默认新建)\n";
        strVar += "            <\/label>\n";
        strVar += "<\/div>\n";
        strVar += "<button type=\"button\" data-id=\"created_a_"+num+"\" class=\"btn btn-primary\">确认<\/button>\n";
        $('.created_div_'+$(this).parent().parent().attr('data-id')).append(strVar) 
    })
})
