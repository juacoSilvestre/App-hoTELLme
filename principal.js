
import React, {Component} from 'react';
import {StyleSheet,Alert,StatusBar,TextInput,TouchableHighlight,Button, View,SafeAreaView, Text, Image ,ScrollView} from 'react-native';

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({name: 'Newdatabase.db', createFromLocation: '~hotelData.db'})
var db2 = SQLite.openDatabase({name: 'Newdatabase2.db', createFromLocation: '~hotelData.db'})
var hotelRand=[
    {name:'Florida', imgn: require("../images/florida.jpg") ,price:5000, stars:require("../images/star14.png"),id:1},
    {name:'Rits Hotel', imgn: require("../images/3estr.jpg"),price:1500, stars:require("../images/star13.png"),id:2},
    {name:'Ciscar', imgn: require("../images/3estrellas.jpg"),price:2000, stars:require("../images/star13.png") ,id:3},
    {name:'Cezar', imgn: require("../images/cezar.jpg"),price:10000, stars: require("../images/star5.png"),id:4},
]

const onceFlag= true
class Principal extends Component{
    static navigationOptions = {
        header: null
    }

    constructor(props){
        super(props)
        this.state= {
         
        nameToSearch:'',
        id:0,
        count:0,
        };


    }

    loadData=()=>{  
        
        db2.transaction((tx)=>{
            var noRepeat = [0]
            tx.executeSql('SELECT * FROM hoteles',[],(tx1, results)=>{
                var len =results.rows.length

                if(len>0){
                for(var i=0 ; i<4;i+=1){
                    var rand = Math.floor(Math.random()*(results.rows.length)+1)
                    
                    while(noRepeat.includes(rand)){rand = Math.floor(Math.random()*(results.rows.length)+1)}
                    noRepeat[i] = rand
                    
                    let row = results.rows.item(rand-1)
                switch(rand){
                    case 1: hotelRand[i]={imgn: require("../images/florida.jpg"), name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id};continue;
                    case 2: hotelRand[i]={imgn: require("../images/3estr.jpg"),name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue;
                    case 3: hotelRand[i]={imgn: require("../images/3estrellas.jpg"), name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue;
                    case 4: hotelRand[i]={imgn: require("../images/cezar.jpg"), name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue;
                    case 5: hotelRand[i]={imgn: require("../images/h32.jpg"), name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue;
                    case 6: hotelRand[i]={imgn: require("../images/h3e.jpg"), name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue;
                    case 7: hotelRand[i]={imgn: require("../images/ibis.jpg" ),name:row.nombre,price:row.precio, stars:this.stars(row.estrellas), id:row.id}; continue; 
                    default: continue;
                            } 
                       
                        
                    }
                }});
            });
        } 
    
    changeNameToSearch=(newToSearch)=>{ 
        this.setState({nameToSearch:newToSearch});
    };
    buttonPressed=()=>{
        if(this.state.nameToSearch){
            db.transaction((tx)=>{
                tx.executeSql('SELECT * FROM hoteles WHERE nombre=?',[this.state.nameToSearch],(tx, results)=>{
                    var len = results.rows.length;
                    
                    if(len>0){
                    var row = results.rows.item(0);
                    this.setState({
                          id: row.id });
                          
                    this.props.navigation.navigate('Detail',{name: this.state.nameToSearch})
                    } else{
                        
                        Alert.alert("El nombre solicitado no ha sido encontrado.")
                    }  
                });
            });
        }
        
    }
    reloadWait=()=>{
        if(this.state.count%5==0){
        this.loadData()}
        
    }
    stars=(anyNum)=>{
        switch(anyNum){
            case 1: return require("../images/star.png");
            case 2: return require("../images/star12.png");
            case 3: return require("../images/star13.png");
            case 4: return require("../images/star14.png");
            case 5: return require("../images/star5.png");
        }
    }
    buttonPressed0=()=>{
        this.props.navigation.navigate('Detail',{name: hotelRand[0].name})
    }
    buttonPressed1=()=>{
        this.props.navigation.navigate('Detail',{name: hotelRand[1].name})
    }
    buttonPressed2=()=>{
        this.props.navigation.navigate('Detail',{name: hotelRand[2].name})
    }
    buttonPressed3=()=>{
        this.props.navigation.navigate('Detail',{name: hotelRand[3].name})
    }

    render(){
        this.reloadWait()
        
        return(
        <SafeAreaView  style={{flex: 1, width: 100+'%', height: 100+'%', backgroundColor: '#fffffafa'}}>
            <StatusBar barStyle='light-content' backgroundColor="#8A0808"/>
            <ScrollView >
                
                <Text  style={{padding:0+"%"}}>principio</Text>
                <Image source={require("../images/header.jpg")} style={styles.imageHeader}/>
                <Image source={require("../images/pared.jpg")} style={styles.imageB}/>
                  
                <Text style={styles.title}>hoTELLme</Text>
                <View> 
                <Image source={require("../images/search.png")} style={styles.searchImg}/>
                    <TextInput style={styles.searcher} placeholder={'Encuentre su hotel'}  value={this.state.nameToSearch}
                        onChangeText={this.changeNameToSearch.bind(this)}/>
                    <TouchableHighlight underlayColor='transparent' onPress={() => this.buttonPressed()}>
                        <Text style={styles.searchTxt}>search</Text>
                    </TouchableHighlight>
                    <Text style={{fontSize:30, top:35+'%',left:18+'%',fontFamily:'custom'}}>Ofertas Especiales </Text>
                </View> 
                <View style={styles.imgHa}>
                    <Image source={require("../images/paper1.png")} style={styles.ha}/>
                    <Image source={hotelRand[0].imgn} style={styles.ha1}/>
                    <Text style={styles.hotlelName}>{hotelRand[0].name}</Text>
                    <Image  style={styles.starsPick0} source={hotelRand[0].stars}/>
                    
                </View>
                <View style={styles.imgHb}>
                    <Image source={require("../images/paper.png")} style={styles.hb}/>
                    <Image source={hotelRand[1].imgn} style={styles.hb1}/>
                    <Text style={styles.hotlelName}>{hotelRand[1].name}</Text>
                    <Image  style={styles.starsPick1} source={hotelRand[1].stars}/>   
                </View>
                <View style={styles.imgHc}>
                    <Image source={require("../images/news.png")} style={styles.hc}/>
                    <Image source={hotelRand[2].imgn} style={styles.hc1}/>
                    <Text style={styles.hotlelName}>{hotelRand[2].name}</Text>
                    <Image  style={styles.starsPick2} source={hotelRand[2].stars}/>     
                </View>
                <View style={styles.imgHd}>
                    <Image source={require("../images/poster4.jpg")} style={styles.hd}/>
                    <Image source={hotelRand[3].imgn} style={styles.hd1}/>
                    <Text style={styles.hotlelName}>{hotelRand[3].name}</Text>
                    <Image  style={styles.starsPick3} source={hotelRand[3].stars}/>     
                </View>
                <View style={styles.esperanza}>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} ><Text style={{width:80,padding:20,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} onPress={() => this.buttonPressed0()}><Text style={{ width:80,padding:180,paddingLeft:50,paddingRight:300,height:100,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} ><Text style={{width:80,padding:20,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} onPress={() => this.buttonPressed1()}><Text style={{width:80,height:180,padding:220,paddingLeft:50,paddingRight:300,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} ><Text style={{width:80,padding:20,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} onPress={() => this.buttonPressed2()}><Text style={{width:80,height:200,padding:250,paddingLeft:50,paddingRight:300,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} ><Text style={{width:80,padding:20,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                <TouchableHighlight style={{flex:1, justifyContent:'center'}} title={'boton'} onPress={() => this.buttonPressed3()}><Text style={{width:80,height:200,padding:200,paddingLeft:50,paddingRight:300,height:50,textAlignVertical:"center"}}> </Text></TouchableHighlight>
                </View>
                <Text  style={{padding:230}} >fin</Text>
               
            </ScrollView>
            
        </SafeAreaView>
        ); 
    }
    componentDidMount(){
        this.myInterval = setInterval(()=>{
            this.setState(prevState=>({count: prevState.count +1}))
        },1000)
    }
    componentWillUnmount(){
        clearInterval(this.myInterval)
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
        alignItems:'center',

    },
    starsPick0:{
        width: 80+'%',
        height: 12+'%',
        position:'absolute',
        top:73+'%',
        left:10+'%',
        flex:1,
    },
    starsPick1:{
        width: 70+'%',
        height: 8+'%',
        position:'absolute',
        top:73+'%',
        left:15+'%',
        flex:1,
    },    
    starsPick2:{
        width: 80+'%',
        height: 10+'%',
        position:'absolute',
        top:10+'%',
        left:10+'%',
        flex:1,
    },    
    starsPick3:{
        width: 90+'%',
        height: 13+'%',
        position:'absolute',
        top:-15+'%',
        left:5+'%',
        flex:1,
    },
    searchTxt:{
        top:-65+'%',
        left:75+'%',
        height:55,
        width:55,
        fontSize:0,
        backgroundColor:'transparent',
    },
    searchImg:{
        position:"absolute",
        top:12.5+'%',
        left:73+'%',
    },
    searcher:{
        color:'green',
        backgroundColor: 'transparent',
        borderColor:'green',
        borderWidth:2,
        borderRadius:10,
        height:100+'%',
        width:60+'%',
        top:20+'%',
        left:10+'%',
        flex: 1,
        fontSize:25,
        fontFamily:'custom',
       
    },
    scrlw:{
        flex: 1,
        height: 200+'%',
        
    },
    bottom:{
        position:"absolute",
        width: 100+"%",
        height: 10+"%",
        top: 200+"%",
        backgroundColor:"red",
        padding:10,
    },
    scro:{
        flexGrow:1,
        
    },
    z:{
        position:"absolute",
        width: 100+'%',
        height: 30+'%',
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
    ha: {
        width: 100+'%',
        height: 190+'%',
        top: -35+'%',
        borderRadius:10,
    },
    ha1: {
        width: 95+'%',
        height: 60+'%',
        top: 9+'%',
        left: 2+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHa: { 
        position:"absolute",
        top: 10+'%',
        left: 5+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 15+'%', 
        borderRadius:10,     
    },
    hotlelName:{
        fontSize: 25,
        fontFamily: 'custom',
        color: '#8A0808',
        textAlign: 'center',
        position: "absolute",
        top: -1+'%',   
    },
    
    hb: {
        width: 100+'%',
        height: 100+'%',
        top: -10+'%',
        borderRadius:10,
    },
    hb1: {
        width: 80+'%',
        height: 60+'%',
        top: 10+'%',
        left: 10+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHb: { 
        position:"absolute",
        top: 25+'%',
        left: 20+'%',
        alignItems: 'center',
        width: 80+'%',
        height: 20+'%',    
        borderRadius:10,
    },
    hc: {
        width: 100+'%',
        height: 100+'%',
        top: -15+'%',
        borderRadius:10,
    },
    hc1: {
        width: 95+'%',
        height: 50+'%',
        top: 25+'%',
        left: 2.5+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHc: { 
        position:"absolute",
        top: 43+'%',
        left: 5+'%',
        alignItems: 'center',
        width: 90+'%',
        height: 25+'%',
        borderRadius:10,    
        
    },
    hd: {
        width: 100+'%',
        height: 100+'%',
        top: -15+'%',
        borderRadius:10,
    },
    hd1: {
        width: 95+'%',
        height: 60+'%',
        top: 15+'%',
        left: 2.5+'%',
        position:"absolute",
        borderRadius:10,
    },  
    imgHd: { 
        position:"absolute",
        top: 67+'%',
        left: 5+'%',
        alignItems: 'center',
        width: 90+'%',
        height: 20+'%',
        borderRadius:10,    
        
    },
    title: {
        fontSize: 50,
        fontFamily: 'custom',
        color: '#8A0808',
        textAlign: 'center',
        position: "absolute",
        top: 5+'%',
        left: 18+'%',

    },
});

export default Principal