import React from 'react';
import CreateContent from './CreateContent'
import CreateTitle from './CreateTitle'
import CreateTags from './CreateTags'
import './CreatePage.css'

const CreatePage = () => (
    
    <div> 
        <h1>Create Blog Post</h1>
        <hr />
        <div>
            <CreateTags />
            <CreateTitle />
            <CreateContent />
        </div>
    </div>
)
 
export default CreatePage;