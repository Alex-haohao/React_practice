import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
import ReactDOM from "react-dom";
import { firestoreConnect } from 'react-redux-firebase';
import { NavLink, Redirect } from 'react-router-dom';
import TrashScreen from './trashScreen'


class TodoListLinks extends React.Component {
    state ={        showPopup:false,
        currentid :0
    }

    handletime = () => {
        
        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(this.props.wireframes.id).set({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
      }

      handledeleteList = (id,e) => {
        e.stopPropagation()
        e.preventDefault()
        const { target } = e;
        if(id==0){
            window.location.reload();

            return <Redirect to="/" />;
        }
        this.setState({showPopup: !this.state.showPopup});


        const fireStore = getFirestore();
            fireStore.collection('wireframes').doc(id).delete().then(() => {
                    console.log("delete data");
                }).catch((err) => {
                    console.log(err);
                });
    }

    constructor(props) {
        super();
    
        console.log('This happens 1st.');
    
        this.state = {
          loading: 'initial',
          data: ''
        };
    
      }
      loadData() {
        var promise = new Promise((resolve, reject) => { 
          setTimeout(() => {
            console.log('This happens 6th (after 3 seconds).');
            resolve('This is my data.');
          }, 1000);
        });
    
        console.log('This happens 4th.');
    
        return promise;
      }
      
      componentDidMount() {

        console.log('This happens 3rd.');
    
        this.setState({ loading: 'true' });
        this.loadData()
        .then((data) => {
          console.log('This happens 7th.');
          this.setState({
            data: data,
            loading: 'false'
          });
        });
      }




      goTash =(id,e) => {
        e.stopPropagation()
        e.preventDefault()
        this.setState({showPopup: !this.state.showPopup});
        this.state.currentid = id
      }


    render() {

        if (this.state.loading === 'initial') {
            console.log('This happens 2nd - after the class is constructed. You will not see this element because React is still computing changes to the DOM.');
            return <h2>Intializing...</h2>;
          }
      
      
          if (this.state.loading === 'true') {
            console.log('This happens 5th - when waiting for data.');
            return <h2>Loading...</h2>;
          }

          

        const wireframes = this.props.wireframes;
        const fireStore = getFirestore();
        const userid = this.props.auth.uid;

        const snapshot = this.props.users
        

        
        // const isadmin = docdata.isadmin
      
        const users = this.props.users
        const user = users.filter(each => (each.id == userid ))
         console.log("is admin: "+user[0].isadmin)

         if(user[0].isadmin == true){
            return (
                <div className="todo-lists section" >

 {this.state.showPopup ? <TrashScreen goTash={this.goTash.bind(this)}
             wireframes={this.props.wireframes}
             handledeleteList = {this.handledeleteList}
             id ={this.state.currentid}/> 
             : null}
               

                    {wireframes && wireframes
                    .map(wireframe => (
                        <Link to={'/wireframes/' + wireframe.id} key={wireframe.id}  onClick={() => {
                            const fireStore = getFirestore();
                      if(!wireframe.id){
                        window.location.reload();      
             }  
             
           

                fireStore.collection('wireframes').doc(wireframe.id).update({
                    createdAt: fireStore.FieldValue.serverTimestamp(),
    
                }).then(() => {
                        console.log("update the data");
                    }).catch((err) => {
                        console.log(err);
                    });
                          }}  >
                              
                            <TodoListCard wireframe={wireframe} id ={wireframe.id}
                            goTash={this.goTash.bind(this)}/>
                              
            
                        </Link>
                    ))}
                </div>
            );
         }
         else{
      
        
        return (
            <div className="todo-lists section" >
                {this.state.showPopup ? <TrashScreen goTash={this.goTash.bind(this)}
                wireframes={this.props.wireframes}
                id ={this.state.currentid}
                handledeleteList = {this.handledeleteList}/> 
                : null}


                {wireframes && wireframes.filter(wireframe => (wireframe.userid == this.props.auth.uid))
                .map(wireframe => (
                    <Link to={'/wireframes/' + wireframe.id} key={wireframe.id}  onClick={() => {
                        const fireStore = getFirestore(); 
                  if(!wireframe.id){
                    window.location.reload();
                    
         }      
            fireStore.collection('wireframes').doc(wireframe.id).update({
                createdAt: fireStore.FieldValue.serverTimestamp(),

            }).then(() => {
                    console.log("update the data");
                }).catch((err) => {
                    console.log(err);
                });
                      }}  >
                          
                        <TodoListCard wireframe={wireframe} id ={wireframe.id}
                        goTash={this.goTash.bind(this)}/>
                        
                    </Link>
                ))}
            </div>
        );
                    }


    }
}

const mapStateToProps = (state) => {
    return {
        users: state.firestore.ordered.users,
        wireframes: state.firestore.ordered.wireframes,
        auth: state.firebase.auth,
        
    };
};

export default compose(connect(mapStateToProps),firestoreConnect([
    {collection: 'users'},
]))(TodoListLinks);