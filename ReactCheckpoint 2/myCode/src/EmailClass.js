import React from 'react';
import './App.css';

class EmailClass extends React.Component{

    constructor(props){
        super(props)

        this.state = {emails: [],
                      showAllEmails: true,
                      emailID: -1,
                      showIndividualEmail: false,
                      showComposeEmail: false,
                      emailSender: '',
                      emailRecipient: '',
                      emailSubject: '',
                      emailMessage: '',
                      search: '',
                      searchResults: [],
                      showSearchResults: false};

        this.UpdateEmailSender = this.UpdateEmailSender.bind(this)
        this.SendEmail = this.SendEmail.bind(this)
        this.UpdateEmailReceipient = this.UpdateEmailReceipient.bind(this)
        this.UpdateEmailMessage = this.UpdateEmailMessage.bind(this)
        this.UpdateEmailSubject = this.UpdateEmailSubject.bind(this)
        this.UpdateSearch = this.UpdateSearch.bind(this)
        this.HandleSearch = this.HandleSearch.bind(this)
    }

    /*
        Email Structure

        {"sender":"katie@galvanize.com",
        "recipient":"jane@galvanize.com",
        "subject":"Standup meeting",
        "message":"M...",
        "date":"2020-08-23T18:25:43.511Z",
        "id":1}
    */


    async componentDidMount(){
        const url = "http://localhost:3001/emails"
        const response = await fetch(url)
        const data = await response.json()

        this.setState({emails: data})
    }

    HandleViewEmail =(event) =>
    {
    
        event.preventDefault()
        this.setState({showAllEmails: false})
        this.setState({showIndividualEmail: true})
        this.setState({emailID: event.target.id})
    }
    ListEmails =(event)=>{
        event.preventDefault()
        this.setState({showAllEmails: true})
        this.setState({showIndividualEmail: false})
        this.setState({showComposeEmail: false})
        this.setState({showSearchResults: false})
    }
    HandleComposeEmail=(event)=>{
        event.preventDefault()
        this.setState({showAllEmails: false})
        this.setState({showComposeEmail: true})
    }
    async HandleSearch(event){
        event.preventDefault()
        this.setState({showSearchResults: true})
        this.setState({showAllEmails: false})

        const url = "http://localhost:3001/search?query=" + this.state.search
        const response = await fetch(url)
        const data = await response.json()

        this.setState({searchResults: data})
        // set up a call to the server
        // http://localhost:3001/search?query={the thing to search for}
        // async fetch
        // wait for the results
        // conver to json
        // then format them as <li> </li>
        // then render them

    }
    UpdateEmailSender(event){
        this.setState({emailSender: event.target.value})
    }
    UpdateEmailReceipient(event){
        this.setState({emailRecipient: event.target.value})
    }
    UpdateEmailMessage(event){
        this.setState({emailMessage: event.target.value})
    }
    UpdateEmailSubject(event){
        this.setState({emailSubject: event.target.value})
    }
    UpdateSearch(event){
        this.setState({search: event.target.value})
    }

    async SendEmail(event){
        event.preventDefault()

        if(this.state.emailSender === '' ||
           this.state.emailRecipient === '' ||
           this.state.emailSubject === '' ||
           this.state.emailMessage === ''){
               // don't do anything if any of the fields are blank
               alert('Sender: ' + this.state.emailSender + "\n" 
                + 'Recipient: ' + this.state.emailRecipient + "\n" +
                'Subject: ' + this.state.emailSubject + "\n" +
                'Message: ' + this.state.emailMessage + "\n" +
                'one of the input fields is blank, cant send')
               return
           }

        


        alert('Sender: ' + this.state.emailSender + "\n" 
        + 'Recipient: ' + this.state.emailRecipient + "\n" +
        'Subject: ' + this.state.emailSubject + "\n" +
        'Message: ' + this.state.emailMessage + "\n" +
        'All fields have some data (might be "" ) trying to send email')


        let today = new Date();
        let emailToSend = {
            sender: this.state.emailSender,
            recipient: this.state.emailRecipient,
            subject: this.state.emailSubject,
            message: this.state.emailMessage,
            date: today,
            id: 55
        }
        console.log(emailToSend)
        // {
        //     "sender": String,
        //     "recipient": String,
        //     "subject": String,
        //     "message": String,
        //     "date": Date,
        //     "id": Number
        //   }

        const sendURL = "http://localhost:3001/send"
        const emailSendResponse = await fetch(sendURL, {method: 'POST', 
                                                        headers: {'Content-Type': 'application/json'},
                                                        body: JSON.stringify(emailToSend)})

        if(emailSendResponse.status >=200 && emailSendResponse.status <300){
            alert('Email was sent Successfully')
            this.componentDidMount()
            
        }else{
            alert('Error Code: '+ emailSendResponse.status + '\n' +
            'Error: ' + emailSendResponse.statusText)
        }

        

    }
    render(){
        let emailOutput = this.state.emails.map(email => {
            
            return (<li>
                Subject: {email.subject} <br></br>
                Sender: {email.sender}
                <button  id= {email.id} onClick={this.HandleViewEmail}>View Email</button>
            </li>)
        })

        let searchOutput = this.state.searchResults.map(email => {
            
            return (<li>
                Subject: {email.subject} <br></br>
                Sender: {email.sender}
                <button  id= {email.id} onClick={this.HandleViewEmail}>View Email</button>
            </li>)
        })

        if(this.state.showAllEmails){
            return(
                <div>
                    <header> Hello World </header>
                    <input type="text" value={this.state.search} onChange={this.UpdateSearch}></input>
                    <button onClick={this.HandleSearch}> Search </button>
                    <br></br>
                    <button onClick ={this.HandleComposeEmail}>Compose Email</button>
                    <ul> 
                        {emailOutput} 
    
                    </ul>
                </div>
            )
        }

        if(this.state.showIndividualEmail){
            
            return( 
                <div>
                    
                    
                    {/* Email Structure

                    {"sender":"katie@galvanize.com",
                    "recipient":"jane@galvanize.com",
                    "subject":"Standup meeting",
                    "message":"M...",
                    "date":"2020-08-23T18:25:43.511Z",
                    "id":1}
                     */}

                     
                    Sender: {this.state.emails[this.state.emailID - 1].sender} <br></br>
                    Recipient:{this.state.emails[this.state.emailID - 1].recipient} <br></br>
                    Subject:{this.state.emails[this.state.emailID - 1].subject} <br></br>
                    Message:{this.state.emails[this.state.emailID - 1].message} <br></br>
                    Date:{this.state.emails[this.state.emailID - 1].date} <br></br>
                    ID:{this.state.emails[this.state.emailID - 1].id} <br></br>
                    

                    <button onClick ={this.ListEmails} > This button takes us back to the list of emails  </button>

                </div>)
        }
        
        if(this.state.showComposeEmail){

            // POST `/send`:

            // ```
            // {
            //     "sender": String,
            //     "recipient": String,
            //     "subject": String,
            //     "message": String,
            //     "date": Date,
            //     "id": Number
            // }

            return (
                <div>
                    <label>
                    Sender: 
                    <input type="text" value={this.state.emailSender} onChange={this.UpdateEmailSender}></input>
                       <br></br>
                    </label>

                    <label>
                        Recipient: 
                        <input type ="text" value={this.state.emailRecipient} onChange ={this.UpdateEmailReceipient}></input> 
                        <br></br>
                    </label>
                    
                    <label>
                    Subject:
                    <input type="text" value={this.state.emailSubject} onChange={this.UpdateEmailSubject}></input>
                       <br></br>
                    </label>
                   

                    <label>
                        Message: 
                        <input type ="text" value={this.state.emailMessage} onChange ={this.UpdateEmailMessage}></input> 
                        <br></br>
                    </label>
                    
                    
                    DATE: auto generated = new Date() <br></br>
                    ID: should be auto generated by = this.state.emails.length + 1 <br></br>
                    <button onClick={this.SendEmail}> Send Email </button>
                    <button onClick={this.ListEmails}> Show All Emails / go back </button>
                </div>
            )
        }
        if(this.state.showSearchResults){
            return(
                <div>
                    Currently Searching for: {this.state.search} <br></br>
                    <button onClick={this.ListEmails}> Go Back to List of Emails</button>
                    <ul>
                        {searchOutput}
                    </ul>
                </div>
            )
        }

    } 
    
    
}

export default EmailClass