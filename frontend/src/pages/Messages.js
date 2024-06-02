//  frontend/src/pages/Messages.js

import React from 'react'
import ModalMessage from '../components/ModalMessage'

export default function Messages() {
  return (
    <div className="modal fade show" id="modalview" style={{display: 'block', paddingRight: '17px'}} aria-modal="true">
        <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">

            <div className="modal-content">


                <div className="modal-header">
                    <div className="modal-title h4">Messages</div>

                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>


                <div className="modal-body">


                    <ul className="list-unstyled">
                        <ModalMessage/>
                        <ModalMessage/>
                        <ModalMessage/>
                        <ModalMessage/>
                        <ModalMessage/>
                        <ModalMessage/>
                        <ModalMessage/>
                    </ul>

                </div>
            </div>
        </div>
    </div>
  )
}
