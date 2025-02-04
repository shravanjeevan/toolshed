import React from 'react';

import AppHeader from './AppHeader';
import PopularPosts from './PopularPosts';
import CategoryExplorer from './CategoryExplorer';
import TagExplorer from './TagExplorer';
import './AppPage.css';

class AppPage extends React.Component {
    render() {
        return (
            <div className="page">
                <AppHeader />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg">
                            <div className="mb-5">
                                <PopularPosts />
                            </div>
                        </div>
                        <div className="col-lg">
                            <div className="mb-5">
                                <CategoryExplorer />
                            </div>
                            <div className="mb-5">
                                <TagExplorer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AppPage;
