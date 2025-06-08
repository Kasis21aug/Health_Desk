import React from 'react'

const Biography = ({imageUrl}) => {
  return (
       <div className='container biography'>
          <div className ="banner">
            <img  src={imageUrl} alt=""/>
          </div>
          <div className="banner">
              <p>Biography</p>
              <h3>Who we are</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, dolorum! Officia assumenda provident ea commodi?</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui ad molestiae repellat, dignissimos et veritatis voluptatum eveniet minima mollitia autem dolores iusto consequuntur alias impedit est repellendus. Inventore porro ratione ut temporibus, veritatis officia.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, iure.</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
       </div>
  )
}

export default Biography