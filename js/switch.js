class Switch_Tab{
    constructor(){
        this.state=true;
        this.switch_p=$("<p class='switch'>");
        this.switch_span=$("<span class='circle'>");
        this.switchbtn=this.switch_p.append(this.switch_span);
        this.__init__();
    }
    __init__(){
        var _=this;
        this.switch_p.click(function(){
            if(_.state){
                _.state=false;
                _.close();
            }else{
                _.state=true;
                _.open();
            }
        })
    }
    open(){
        this.switch_p.css({
            backgroundColor:'#67C23A',
        })
        this.switch_span.css({
            right: '3px'
        })
    }
    close() {
        this.switch_p.css({
            backgroundColor: "#dcdfe6"
        })
        this.switch_span.css({
            right: '21px'
        })
    }
}

