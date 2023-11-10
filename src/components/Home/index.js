import {Component} from 'react'
import {CirclesWithBar} from 'react-loader-spinner'
import UserDetails from '../UserDetails'
import './index.css'

class Home extends Component{
    state={
        offset:0,
        dataList:[],
        searchText:'',
        status:'loading',
        
    }

    
    componentDidMount(){
        this.getData()
    }

    getData= async()=>{
        const {offset,searchText}=this.state
        this.setState({status:'loading'})
        let url=null
        if (searchText!==''){
         url=`https://todolist-backend-production-6c98.up.railway.app/user/${searchText}`
        }else{
        url=`https://todolist-backend-production-6c98.up.railway.app/users/?limit=20&offset=${offset}`
        }
        console.log(url)
        const fetchData=await fetch(url)
        if(fetchData.ok){
            const data=await fetchData.json()
            console.log(data)
            if(data.length!==0){
                let updatedData=null
                console.log(data.length, typeof data)
              if (data.length!==undefined){
                 updatedData=data.map(item=>({
                    id:item.id,
                    firstName:item.first_name,
                    lastName:item.last_name,
                    email:item.email,
                    avatar:item.avatar,
                    gender:item.gender,
                    domain:item.domain,
                    available:item.available
                }))
              }else{
                 updatedData={
                    id:data.id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    email:data.email,
                    avatar:data.avatar,
                    gender:data.gender,
                    domain:data.domain,
                    available:data.available
                }
              }
            this.setState({dataList : updatedData,status:'success'})}
            else{
                this.setState({status:'empty'})
            }
    }else{
        this.setState({status:'failure'})
    }
    }

    updateSearch=(event)=>{
        this.setState({searchText:event.target.value})
    }

    fetch=async (offset)=>{
        const url=`https://todolist-backend-production-6c98.up.railway.app/users/?limit=20&offset=${offset}`
        const response=await fetch(url);
        const data=await (response.json())
        console.log(data.length)
        if(data.length===0){
          return false
        }
        return true 
  
      }
  
    next=async ()=>{
          let {offset}=this.state
          console.log('I am called')
          offset+=20
          const result=await this.fetch(offset)
          console.log(result)
          if (result){
            await this.setState(prevState=>({offset:prevState.offset+20}))
            this.getData()
          }
      }
  
    prev=async ()=>{
          const {offset}=this.state
          if(offset!==0){
              await this.setState(prevState=>({offset:prevState.offset-20}))
          }
          this.getData()
      }

    successView=()=>{
        const {dataList}=this.state
        if(dataList.length!==undefined){
        return  <ul>
        {dataList.map(item=><UserDetails key={item.id} deleteUser={this.deleteUser} updateCard={this.updateCard} itemDetails={item}/>)}
      </ul>
        }
        return <UserDetails itemDetails={dataList}/>
    }

    failureView=()=><div className='align-center'>
        <h2>Something went wrong, Please try again</h2>
        <button type='button' onClick={this.getData} className='pagination-buttons'>Retry</button>
    </div>

    emptyView=()=><div className='align-center'>
    <img src='https://res.cloudinary.com/dkredoejm/image/upload/v1699463696/empty_dpwv00.png' alt='empty' className='empty'/>
    <h2 style={{color:'white'}}>It's empty, Nothing to display here</h2>
    </div>

    loadingView=()=><div className='align-center'>
        <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
    </div>

    output=()=>{
        const {status}=this.state
        switch(status){
            case 'success':
                return this.successView()
            case 'failure':
                return this.failureView()
            case 'empty':
                return this.emptyview()    
            case 'loading':
                return this.loadingView()
            default:
                return null    
        }
    }

    deleteUser=async (id)=>{
        const url=`https://todolist-backend-production-6c98.up.railway.app/delete/${id}`
        const data=await fetch(url, {
            method: 'DELETE',
        })
        console.log(data)
        this.getData()
       
    }
   
    render(){
        const {searchText}=this.state
        return <div className='background'>
            <nav>
                <img src='https://res.cloudinary.com/dkredoejm/image/upload/v1699461733/todo_pegzlx.png' alt='logo' className='logo'/>
            </nav>
            <div className='flex-justify-content-center'>
            <input type='text' onChange={this.updateSearch} value={searchText} placeholder='search specific user'/>
            <button onClick={this.getData} className='pagination-buttons' style={{padding:'5px'}}>Search</button>
            </div>
           <div>
            {this.output()}
           </div>
            <div className='flex-align-center'>
                <button type='button' onClick={this.prev} className='pagination-buttons'>&lt;</button>
                <button type='button' onClick={this.next} className='pagination-buttons'>&gt;</button> 
            </div>
        </div>
    }
}

export default Home