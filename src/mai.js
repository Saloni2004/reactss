import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#224',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ControlledInputs = () => {
  const [firstName, setFirstName] = useState('');
  const [people, setPeople] = useState([]);
  const [accept, setAccept] = useState([]);
  const [reject, setReject] = useState([]);
  const [count,setCount]=useState(0);
  const [acc,setAcc]=useState(0);
  const [rej,setRej]=useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName ) {
      const person = { id: new Date().getTime().toString(), firstName};
      console.log(person);
      setCount(count+1);
      setPeople((people) => {
        return [...people, person];
      });
      setFirstName('');
     
    } else {
      console.log('empty values');
    }
  };

  const removePerson = (id,firstName) => {
    const person={id,firstName};
    setRej(rej+1);
    setReject((reject)=>{
      return[...reject,person];
    })
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };

  const acceptPerson = (id,firstName) => {
    const person={id,firstName};
    setAcc(acc+1);
    setAccept((accept)=>{
      return[...accept,person];
    })
    setPeople((people) => {
      return people.filter((person) => person.id !== id);
    });
  };
  return (
    <>
      <article>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div className='count'>
              <h1 style={{color:"white"}}>Count all types</h1>
              <h3 style={{color:"white"}}>In progress:{count-acc-rej}</h3>
              <h3 style={{color:"white"}}>Accepted:{acc}</h3>
              <h3 style={{color:"white"}}>Rejected:{rej}</h3>
              <h3 style={{color:"white"}}>Total:{count}</h3>
            </div>
          </Grid>
          <Grid item xs={4}>
            <form className='form' onSubmit={handleSubmit}>
          <div className='form-control'>
            
            <input
              type='text'
              id='firstName'
              name='firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <button type='submit' className="sbtn" >Add Person</button>
          </div>
        </form>
          </Grid>
        </Grid>
        
        
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Item><h1>Accepted</h1></Item>
          </Grid>
          <Grid item xs={4}>
            <Item><h1>In Progress</h1></Item>
          </Grid>
          <Grid item xs={4}>
            <Item><h1>Rejected</h1></Item>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            
             <div className='accept'>
          {accept.map((person) => (
                    <div className='accepts' key={person.id}>
                        <h3>{person.firstName}</h3>
                    </div>
                ))}
        </div>
            
          </Grid>
        <Grid item xs={4}>
          
           <List people={people} removePerson={removePerson} acceptPerson={acceptPerson} />
        </Grid>
        <Grid item xs={4}>
          
          <div className='reject'>
            {reject.map((person) => (
                    <div className='rejects' key={person.id}>
                        <h3>{person.firstName}</h3>
                    </div>
                ))}
        </div>

        </Grid>
        
        </Grid>
      </article>
    </>
  );
};



const List = ({ people, removePerson,acceptPerson }) => {
  return (
    <>
      {people.map((person) => {
        return (
          <SinglePerson
            key={person.id}
            {...person}
            removePerson={removePerson}
            acceptPerson={acceptPerson}
          />
        );
      })}
    </>
  );
};

const SinglePerson = ({ id, firstName, removePerson, acceptPerson }) => {
  return (
    
    <div className='item'>
      <h4>{firstName}</h4>
      <div className='i-btn'>
      <button className='a-btn' onClick={() => acceptPerson(id,firstName)}>accept</button>
      <button className='r-btn' onClick={() => removePerson(id,firstName)}>remove</button>
      </div>
    </div>
  );
};
export default ControlledInputs;