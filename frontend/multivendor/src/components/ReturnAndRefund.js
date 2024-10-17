import '../style/retrunandrefund.css';
import React, { useState } from 'react';

const ReturnAndRefund = () => {
  const [activeTab, setActiveTab] = useState('return-product');

  return (
    <div className="container mt-5">
        <div className="row justify-content-center mb-2">
        <div className="col text-center">
        <div className="heading">
            <h1>Return And Refund</h1>
            <hr className="underline-hr"/>
        </div>
        </div>
        </div>

      {/* Tab Navigation */}
      <ul className="nav nav-tabs nav-justified">
  <li className="nav-item">
    <a
      className={`nav-link ${activeTab === 'return-product' ? 'active' : ''}`}
      onClick={() => setActiveTab('return-product')}
      href="#"
    >
      How to return a product
    </a>
  </li>
  <li className="nav-item">
    <a
      className={`nav-link ${activeTab === 'return-policy' ? 'active' : ''}`}
      onClick={() => setActiveTab('return-policy')}
      href="#"
    >
      Returns Policy
    </a>
  </li>
  <li className="nav-item">
    <a
      className={`nav-link ${activeTab === 'refund-policy' ? 'active' : ''}`}
      onClick={() => setActiveTab('refund-policy')}
      href="#"
    >
      Refund Policy
    </a>
  </li>
</ul>


      {/* Tab Content */}
      <div className="tab-content mt-4 mb-5">
        {/* Tab 1: How to return a product */}
        {activeTab === 'return-product' && (
          <div className="row">
            {/* Left Side: Steps */}
            <div className="col-md-8">
            <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">1</div> 
                <div className="step-content">
                    Sign in to your Account, click on “My Account” from the bottom.
                </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">2</div>
                <div className="step-content">
                Select the “My Order” section and click on the View all.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">3</div>
                <div className="step-content">
                Choose the item you want to return and click on “initiate return”.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">4</div>
                <div className="step-content">
                Select the “My Order” section and click on the View all.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">5</div>
                <div className="step-content">
                Choose the item you want to return and click on “initiate return”.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className="step-number mr-3">6</div>
                <div className="step-content">
                Select the “My Order” section and click on the View all.
                </div>
            </div>
            </div>

            {/* Right Side: Condition Box */}
            <div className="col-md-4">
              <div className="right-box bg-light p-3 border">
                <h5>Condition for returns</h5>
                <p>
                1.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
                </p>
                <p>
                2.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
                </p>
                <p>3.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.</p>
                <p>
              3.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Returns Policy */}
        {activeTab === 'return-policy' && (
          <div className="mt-3">
          <div className="row">
            
            {/* Left Side: Steps */}
            <div className="col-md-8">
            <h2 className='text-left mb-5'>Return & Refunds</h2>
            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">1</div> 
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">2</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">3</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>
            <h2 className='text-left mb-5'>Valid reasons to return an item</h2>
            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">1</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">2</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">3</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>
            </div>

            {/* Right Side: Condition Box */}
            <div className="col-md-4">
              <div className="right-box bg-light p-3 border">
                <h5>Condition for returns</h5>
                <p>
                1.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
                </p>
                <p>
                2.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.
                </p>
                <p>3.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried on to see if they fit and will still be considered unworn. If a product is returned to us in an inadequate condition, we reserve the right to send it back to you.</p>
                <p>
              3.The product must be unused, unworn, unwashed and without any flaws. Fashion products can be tried.
                </p>
              </div>
            </div>
          </div>
          <div className='mt-5'>
          <h3 className='text-left'>Condition for returns</h3>
             <p className='text-left'>
             Please note that certain items marked as non-returnable on product page are not eligible for return.
              For more information view the complete list of 
            </p>
          <div className="row">
              <div className="col-lg-6">

                <h5 className="d-flex justify-content-between">
                  <span className="shoptogglerH font-weight-bold">Phones and Tablets</span>
                  <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-1" aria-expanded="true" aria-controls="categories-list-1" id="toggle-button-1">
                    <i className="fa fa-chevron-down rotate-icon" id="icon-1"></i>
                </button>
                
              </h5>
              <div id="categories-list-1" className="collapse show">
                  <ul className="category-list list-unstyled">
                      <p className="aboutusCtext">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                          sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                      </p>
                  </ul>
              </div>
              <hr/>
              
              <h5 className="d-flex justify-content-between">
                  <span className="shoptogglerH font-weight-bold">Fashion</span>
                  <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-2" aria-expanded="true" aria-controls="categories-list-2" id="toggle-button-2">
                      <i className="fa fa-chevron-down rotate-icon" id="icon-2"></i>
                  </button>
              </h5>
              <div id="categories-list-2" className="collapse ">
                  <ul className="category-list list-unstyled">
                      <p className="aboutusCtext">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                          sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                      </p>
                  </ul>
              </div>
              <hr/>
              <h5 className="d-flex justify-content-between">
                <span className="shoptogglerH font-weight-bold">Beauty & Health</span>
                <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-3" aria-expanded="true" aria-controls="categories-list-3" id="toggle-button-3">
                    <i className="fa fa-chevron-down rotate-icon" id="icon-3"></i>
                </button>
            </h5>
            <div id="categories-list-3" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div>
            <hr/>
          <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">Appliances</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-4" aria-expanded="true" aria-controls="categories-list-4" id="toggle-button-4">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
            </h5>
            <div id="categories-list-4" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div>  
            <hr/>
            <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">Computing & Gaming</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-5" aria-expanded="true" aria-controls="categories-list-5" id="toggle-button-5">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
            </h5>
            <div id="categories-list-5" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div> 
            <hr/>   
            <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">TVs, Audios & Cameras</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-6" aria-expanded="true" aria-controls="categories-list-6" id="toggle-button-6">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
            </h5>
            <div id="categories-list-6" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div> 
            <hr/>
            <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">Home & Living</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-7" aria-expanded="true" aria-controls="categories-list-7" id="toggle-button-7">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
            </h5>
            <div id="categories-list-7" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div> 
            <hr/>
            <h5 className="d-flex justify-content-between">
            <span className="shoptogglerH font-weight-bold">Sports & Travel</span>
            <button className="btn btn-link p-0" data-toggle="collapse" data-target="#categories-list-8" aria-expanded="true" aria-controls="categories-list-8" id="toggle-button-8">
                <i className="fa fa-chevron-down rotate-icon" id="icon-4"></i>
            </button>
            </h5>
            <div id="categories-list-8" className="collapse ">
                <ul className="category-list list-unstyled">
                    <p className="aboutusCtext">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta fringilla elit ac finibusse. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas
                        sce posuere tincidunt sem nec pulvinar. Phasellus placerat id diam at iaculis. Donec interdum sapien felis, a sollicitudin lectus tincidunt.
                    </p>
                </ul>
            </div> 
              </div>
           </div>
           </div>
          </div>
        )}

        {/* Tab 3: Refund Policy */}
        {activeTab === 'refund-policy' && (
          <div className="mt-3">
          <div className="row">
            
            {/* Left Side: Steps */}
            <div className="col-md-12 text-left">
            <h2 className='text-left mb-5'>Return & Refunds</h2>
            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">1</div> 
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">2</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">3</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>
            <h2 className='text-left mb-5'>Valid reasons to return an item</h2>
            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">1</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">2</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>

            <div className="d-flex align-items-center mb-3">
                <div className=" mr-3">3</div>
                <div className="step-content">
                If your product is damaged, defective, incorrect or incomplete at the time of delivery, please raise a return request on Daraz app or website. Return request must be raised within 14 days from the date of delivery.
                </div>
            </div>
            </div>


          </div>
          <div>
          <div class="container my-4">
        <h2>Refund Options & Times</h2>
        <table class="table table-bordered table-hover table-striped">
            <thead class="table-dark">
                <tr>
                    <th>Payment Method</th>
                    <th>Refund Option</th>
                    <th>Refund Time</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Debit or Credit Card</td>
                    <td>Debit or Credit Card Payment Reversal</td>
                    <td>10 working days</td>
                </tr>
                <tr>
                    <td>Equated Monthly Installments</td>
                    <td>Debit or Credit Card Payment Reversal</td>
                    <td>10 working days</td>
                </tr>
                <tr>
                    <td>Rocket (Wallet / Bkash)</td>
                    <td>Mobile Wallet Reversal / Rocket</td>
                    <td>7 working days</td>
                </tr>
                <tr>
                    <td>Nagad</td>
                    <td>Mobile Wallet Reversal / Nagad</td>
                    <td>9 working days</td>
                </tr>
                <tr>
                    <td>DBBL Nexus (Online Banking)</td>
                    <td>Card Payment Reversal (Nexus)</td>
                    <td>7 working days</td>
                </tr>
                <tr>
                    <td>Bkash</td>
                    <td>Mobile Wallet Reversal / Bkash</td>
                    <td>7 working days</td>
                </tr>
                <tr>
                    <td>Cash on Delivery (COD)</td>
                    <td>Bank Deposit</td>
                    <td>5 working days</td>
                </tr>
                <tr>
                    <td>Daraz Voucher</td>
                    <td>Daraz Refund Voucher</td>
                    <td>1 working day</td>
                </tr>
                <tr>
                    <td>Daraz Voucher</td>
                    <td>Refund Voucher</td>
                    <td>1 working day</td>
                </tr>
            </tbody>
        </table>

        <h2 class="mt-5">Modes of Refund</h2>
        <table class="table table-bordered table-hover table-striped">
            <thead class="table-dark">
                <tr>
                    <th>Mode of Refund</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Bank Deposit</td>
                    <td>The bank account details provided must be correct. The account must be active and should have some balance.</td>
                </tr>
                <tr>
                    <td>Debit or Credit Card</td>
                    <td>If the refund amount is not shown in your card statement after the refund is processed and you have received a notification by Daraz, please contact your card issuer.</td>
                </tr>
                <tr>
                    <td>Bkash / Rocket / Nagad Mobile Wallet</td>
                    <td>Similar to bank deposit, the amount will be refunded to the same mobile account details with which the payment was made.</td>
                </tr>
                <tr>
                    <td>Refund Voucher</td>
                    <td>Vouchers will be sent to the customer’s registered email ID on Daraz and can be redeemed against the same overall top-up amount.</td>
                </tr>
            </tbody>
        </table>
    </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnAndRefund;
