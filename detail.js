
import React, {Component} from 'react';
import {StyleSheet,WebView,Alert,StatusBar,TouchableHighlight, View,SafeAreaView, Text, Image ,ScrollView} from 'react-native';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'Newdatabase.db', createFromLocation: '~hotelData.db'})
var im=[{im1:'', im2:'',im3:''}
]
var starStyle=''
var star =require("../images/star.png")
var bedFlag = true
var bed = require("../images/bed.png")
var contador= 0
var onceFlag=true
var alerta = 'verdadero'
class Detail extends Component{
    static navigationOptions = {
        header: null
    }
    constructor(props){
        
        super(props)
        this.state= {
        
        bedIcon: require("../images/bed.png"),
        stars: 0,
        name:'',    
        price:0,
        location:'',
        beds:0,
        coments:'',
        description:'',
        nameToSearch: this.props.navigation.state.params.name,
        id:0,
        };

        
    }

    imagenes=()=>{
        switch(this.state.id){
            case 1: im={im1: require("../images/florida.jpg"), im2: require("../images/h1.jpg"), im3:require("../images/h2.jpg")};break;
            case 2: im={im1: require("../images/3estr.jpg"), im2: require("../images/h2.jpg"), im3:require("../images/h4.jpg")}; break;
            case 3: im={im1: require("../images/3estrellas.jpg"), im2: require("../images/h1.jpg"), im3:require("../images/h5.jpg")}; break;
            case 4: im={im1: require("../images/cezar.jpg"), im2: require("../images/h3.jpg"), im3:require("../images/h1.jpg")}; break;
            case 5: im={im1: require("../images/h32.jpg"), im2: require("../images/h4.jpg"), im3:require("../images/h1.jpg")}; break;
            case 6: im={im1: require("../images/h3e.jpg"), im2: require("../images/h5.jpg"), im3:require("../images/h3.jpg")}; break;
            case 7: im={im1: require("../images/ibis.jpg"), im2: require("../images/h1.jpg"), im3:require("../images/h3.jpg")}; break; 
        }
    }
    loadData=()=>{
            db.transaction((tx)=>{
                tx.executeSql('SELECT * FROM hoteles WHERE nombre=?',[this.state.nameToSearch],(tx, results)=>{
                    var len = results.rows.length;
                    
                    if(len>0){
                    var row = results.rows.item(0);
                    this.setState({stars: row.estrellas ,name:row.nombre, price:row.precio,
                         beds:row.camas, commemts:row.comentario,description:row.descripcion, location:row.localidad, id: row.id,
                        });
                    
                    }   
                });
            });
            
        
    }
    stars=()=>{
        
        switch(this.state.stars){
            case 1: star=require("../images/star.png");starStyle=styles.starStyle1;break;
            case 2: star=require("../images/star2.png");starStyle=styles.starStyle2;break;
            case 3: star=require("../images/star3.png");starStyle=styles.starStyle3;break;
            case 4: star=require("../images/star4.png");starStyle=styles.starStyle4;break;
            case 5: star=require("../images/star5.png");starStyle=styles.starStyle5;break;
        }
    }
    bedOrCoffe=()=>{
         
        onceFlag=true
        contador=0
        if(bedFlag){
            
            this.setState({bedIcon: require("../images/coffe.png")})
            bedFlag=!bedFlag

                 
            this.props.navigation.navigate('Breakfast')
        }else{
            this.setState({bedIcon: require("../images/bed.png")})
            bedFlag=!bedFlag
            
        }
    }
    justOnce=()=>{

        
        if(onceFlag){
        this.imagenes();
        this.loadData();
        this.stars();
        if (contador>0){
        onceFlag=false

        }
        contador+=1

    }
}
    goBack=()=>{
        contador=0
        onceFlag=true
        this.props.navigation.navigate('Principal')
    }
    render(){

        this.justOnce()
        //this.bedOrCoffe2()
        
        return(
        <SafeAreaView   style={{flex: 1, width: 100+'%', height: 100+'%', backgroundColor: '#fffffafa'}}>
            <StatusBar barStyle='light-content' backgroundColor="#8A0808"/>
            <ScrollView >
                
                <Text  style={{padding:0+"%"}}>principio</Text>
                <Image source={require("../images/header.jpg")} style={styles.imageHeader}/>
                <Image source={require("../images/pared.jpg")} style={styles.imageB}/>
                <Image source={star} style={starStyle}/>
                <Text style={styles.title}>hoTELLme</Text>
                <View style={styles.imgHa}>
                <Image source={require("../images/rollo.png")} style={styles.rollo}/>
                    <Image source={im.im1} style={styles.ha1}/>
                    <Text style={styles.hotlelName}>{this.state.name}</Text>   
                </View>
                <View style={styles.imgHb}>
                    <Image source={require("../images/rollo.png")} style={styles.rollo}/>
                    <Image source={im.im2} style={styles.hb1}/>
                       
                </View>
                <View style={styles.imgHc}>
                    <Image source={require("../images/rollo.png")} style={styles.rollo}/>
                    <Image source={im.im3} style={styles.hc1}/>
                     
                </View>
                <View style={styles.imgHd}>
                    <Image source={require('../images/pizzarra.png')} style={styles.board}/>
                    <Text style={styles.showPrice}>Precio{'$'+this.state.price}</Text>
                    <Text style={styles.showBeds}>Camas {this.state.beds}</Text>
                    <Text style={styles.showDescription}>{this.state.description}</Text>
                    <WebView source={{uri: 'https://www.google.com.ar/maps/@-31.4217603,-64.1672681,19.04z'}}
                    style={styles.mapa}/>
                </View>
                <View style={styles.esperanza}>
                <TouchableHighlight style={{justifyContent:'center',flex:1}} underlayColor='transparent' onPress={()=> this.goBack()}><Image source={require('../images/arrow.png')} style={{flex:1,width:80,height:80,padding:30,alignItems: 'center'}}/></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} ><Text style={{width:80,padding:20,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight underlayColor='transparent' style={styles.imgHd1}  onPress={() => this.bedOrCoffe()}> 
                    <Image source={this.state.bedIcon} style={styles.bed}/>  
                </TouchableHighlight>
                
                </View>
                <Text  style={{padding:1000}} >fin</Text>
               
            </ScrollView>
            
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',   
    },
    esperanza:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center', 
    },
    mapa:{       
        height:150+'%',
        width:118+'%',
        position: "absolute",
        top: 345+'%', 
        left:-46.5+'%',
        borderRadius:50,
    },
    showDescription:{        
        fontSize: 20,
        fontFamily: 'custom',
        color: '#fffffafa',
        textAlign: 'center',
        position: "absolute",
        top: 250+'%', 
        left:15+'%',
    },
    showBeds:{        
        fontSize: 40,
        fontFamily: 'custom',
        color: '#fffffafa',
        textAlign: 'center',
        position: "absolute",
        top: 225+'%', 
        left:10+'%',
    },
    bedTxt:{        
        fontSize: 30,
        fontFamily: 'custom',
        color: '#fffffafa',
        textAlign: 'center',
        position: "absolute",
        top: -250+'%',
        left:10,
        height: 100,
        width:100+'%',
        backgroundColor:'red', 
        flex:1,
        
    },
    bed:{
        height:70,
        width:70,
        padding:20,
        flex:1, 
    },
    showPrice:{
        fontSize: 70,
        fontFamily: 'custom',
        color: '#fffffafa',
        textAlign: 'center',
        position: "absolute",
        top: 140+'%',
         
    },
    board:{
        height:470+"%",
        width:125+"%",
        position:'absolute',
        top:35+"%",
        left:0+"%",
        flex:1, 
    },
    starStyle1:{        
        height:50,
        width:50,
        position:'absolute',
        top:6+"%",
        left:40+"%",
        flex:1,  
    },
    starStyle2:{        
        height:50,
        width:100,
        position:'absolute',
        top:6+"%",
        left:35+"%",
        flex:1,  
    },
    starStyle3:{        
        height:50,
        width:150,
        position:'absolute',
        top:6+"%",
        left:30+"%",
        flex:1,  
    },
    starStyle4:{        
        height:50,
        width:200,
        position:'absolute',
        top:6+"%",
        left:25+"%",
        flex:1,  
    },
    starStyle5:{        
        height:50,
        width:250,
        position:'absolute',
        top:6+"%",
        left:20+"%",
        flex:1,  
    },
    rollo:{
        height:80+"%",
        width:130+"%",
    },
    
    
    bottom:{
        position:"absolute",
        width: 100+"%",
        height: 10+"%",
        top: 200+"%",
        backgroundColor:"red",
        padding:10,
    },
    imageB: {
        width: 100+'%',
        height: 100+'%',
        position:"absolute",
        top:9+"%",
    },
    imageHeader: {
        width: 100+'%',
        height: 9+'%',
        position:"absolute",
        
    },

    ha1: {
        width: 105+'%',
        height: 57.5+'%',
        top: 10.5+'%',
        left: -3+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHa: { 
        position:"absolute",
        top: 10+'%',
        left: 10+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 20+'%', 
        borderRadius:10,     
    },
    hotlelName:{
        fontSize: 40,
        fontFamily: 'custom',
        color: '#8A0808',
        textAlign: 'center',
        position: "absolute",
        top: -35+'%',   
    },
    
    hb: {
        width: 100+'%',
        height: 100+'%',
        top: -10+'%',
        borderRadius:10,
    },
    hb1: {
        width: 105+'%',
        height: 57.5+'%',
        top: 10.5+'%',
        left: -3+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHb: { 
        position:"absolute",
        top: 26+'%',
        left: 10+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 20+'%', 
        borderRadius:10,
    },

    hc1: {
        width: 105+'%',
        height: 57.5+'%',
        top: 10.5+'%',
        left: -3+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHc: { 
        position:"absolute",
        top: 42+'%',
        left: 10+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 20+'%',
        borderRadius:10,    
        
    },
    imgHd: { 
        position:"absolute",
        top: 50+'%',
        left: 0+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 10+'%', 
        borderRadius:10, 
        flex:1,   
        
    },
    imgHd1: {  
        width: 50,
        height: 50, 
        borderRadius:10, 
        flex:1,   

    },
    imgHd2: { 
        top: 0,
        left: 0,
        width: 50,
        height: 50, 
        borderRadius:10, 
        flex:1,   
        
    },

    title: {
        fontSize: 50,
        fontFamily: 'custom',
        color: '#8A0808',
        textAlign: 'center',
        position: "absolute",
        top: 0+'%',
        left: 25+'%',

    },
});

export default Detail