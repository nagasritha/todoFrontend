import {Component} from 'react'
import {AiFillDelete,AiFillEdit} from 'react-icons/ai'
import Popup from 'reactjs-popup'
import './index.css'

class UserDetails extends Component{
   state={
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    gender:'',
    avatar:'',
    domain:'',
    available:'',
   }

   componentDidMount(){
    const {itemDetails}=this.props
    const {id,firstName,lastName,gender,email,avatar,domain,available}=itemDetails
    this.setState({
        id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        gender:gender,
        avatar:avatar,
        domain:domain,
        available:available})
   }
   
   updateAvatar=(event)=>{
    this.setState({avatar:event.target.value})
   }

   updateFirstName=(event)=>{
    this.setState({firstName:event.target.value})
   }

   updateLastName=(event)=>{
    this.setState({lastName:event.target.value})
   }

   updateEmail=(event)=>{
    this.setState({email:event.target.value})
   }

   updateGender=(event)=>{
    this.setState({gender:event.target.value})
   }

   updateDomain=(event)=>{
    this.setState({domain:event.target.value})
   }

   updateAvailable=(event)=>{
    console.log(event.target.checked)
    const bool= event.target.checked
    let value=null
    if (bool){
        value=1
    }   
    else{
        value=0   
    }
    this.setState({available:value})
   }

   save=async (event)=>{
    event.preventDefault()
    const {id,firstName,lastName,email,domain,available,gender,avatar}=this.state
    const userDetails={
        firstName,lastName,avatar,email,gender,domain,available}
    console.log(userDetails)
    const url=`https://todolist-backend-production-6c98.up.railway.app/users/${id}`
    
   await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
    
    }
   
    render() {
        const {itemDetails,deleteUser}=this.props
        const {id}=itemDetails
        const {firstName,lastName,gender,email,avatar,domain,available}=this.state
        const text=available?'Available':'Not-Available'
        const deleteCard=()=>deleteUser(id)
        return (
            <li className='card'>
                <div className='card-profile1'>
                    <img src={avatar} alt={firstName} className='profile'/>
                    <h3>{`${firstName} ${lastName}`}</h3>
                    <p><b>gender: </b>{gender}</p>
                </div>
                <div>
                    <p><b>Email: </b>{email}</p>
                    <p><b>Domain: </b>{domain}</p>
                    <p><b>Status: </b>{text}</p>
                </div>
                <div className='space-between'>
                    <button type='button' onClick={deleteCard}><AiFillDelete size={50} color='red'/></button>
                    <Popup trigger={
                        <button type='button'><AiFillEdit size={50} color='blue'/></button>
                    } modal>
                       {close=>{
                        return <form onSubmit={this.save}>
                        <label htmlFor='avatar'>
                            <img src={avatar} alt={firstName} className='profile'/>
                            <p>Avatar</p></label>
                        <input id='avatar' type='text' value={avatar} onChange={this.updateAvatar}/>        
                        <label htmlFor='frn'>First Name </label>
                        <input id='frn' type='text' value={firstName} onChange={this.updateFirstName}/>
                        <label htmlFor='lsn'>Last Name</label>
                        <input id='lsn' value={lastName} type='text' onChange={this.updateLastName}/>
                        <label htmlFor='email'>Email</label>
                        <input id='email' value={email} type='text' onChange={this.updateEmail}/>
                        <label htmlFor='gender'>Gender</label>
                        <div>
                            <input name='gender' id='Male' type='radio' value='Male' onChange={this.updateGender}/>
                            <label htmlFor='Male'>Male</label>
                            <input name='gender' id='Female' type='radio' value='Female' onChange={this.updateGender}/>
                            <label htmlFor='Female'>Female</label>
                            <input name='gender' id='Agender' type='radio' value='Agender' onChange={this.updateGender}/>
                            <label htmlFor='Agender'>Agender</label>
                        </div>
                        <label htmlFor='domain'>Domain</label>
                        <input id='domain' value={domain} type='text' onChange={this.updateDomain}/>
                        <div>
                            <input type='checkbox' id='available' onChange={this.updateAvailable} checked={available===1?true:false}/>
                            <label htmlFor='available'>Availability</label>
                        </div>
                        <div style={{textAlign:'right'}}>
                        <button type='submit'  className='pagination-buttons'>Save</button>
                        <button onClick={()=>close()} type='button' className='pagination-buttons'>Close</button>
                        </div>
                        </form>
                       }}
                    </Popup>
                </div>
            </li>
        )
        }


    
}

export default UserDetails