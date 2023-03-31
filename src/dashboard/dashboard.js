import * as React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MenuAppBar() {
  const navigate = useNavigate();


return(
  <div>
  <p className='text-white text-center bg-primary fw-bold fs-1'>Software Development</p> 
  <p className='text-center fs-3'> Software Overview</p>

  <div className='row text-center m-2 '>
   <div className='col-md-12'>
                        {
                          [{
                            route: '/Students', name: 'Students dashboard'
                          },
                          {
                            route: '/Institute', name: 'Institute dashboard'
                          },
                          { route: '/Admin', name: 'Admin dashboard' }].map((page, index) => (
                                <Button className=' btn btn-info m-2' key={index} onClick={() => navigate(page.route)}>
                                    {page.name}
                                </Button>
                            ))
                          }                    
</div>
</div>
</div>
  );
}
export default MenuAppBar;