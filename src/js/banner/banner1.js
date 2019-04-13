class Layer {
    static defaultOptions = { //es7支持定义静态属性
        width: 300,
        height: 200,
        drag: true,
        dragLocation: true,
        dragSize: true,
        content: '',
        type: 'default',
    };

    constructor (options) {
        this.options = {...Layer.defaultOptions,...options}
    }

    createlayerWrapper(){
        let div = document.createElement( 'div' );
        div.className += 'layerWrapper';
        document.body.appendChild( div );
        console.log(1);
        return div;
    }

    createLayer ({type,content}){
     let singlelayerWrapper = this.createlayerWrapper();
    }

};

var myLayer  = new Layer({
    width:50,
    height:50,
    type: '错误'
});

document.querySelector('.button').addEventListener("click", event=>{
myLayer.createLayer(myLayer.options)
});