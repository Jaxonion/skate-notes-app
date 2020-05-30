import React from 'react';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className='HomePage'>
                <section>
                    <h1>Home Page</h1>
                    <p><b>Note taking app</b> for <b>skateboarders</b>. <b>Take notes</b> on <b>how</b> you do a <b>trick</b> as well as your <b>foot position</b> for that trick</p>
                </section>
                <section>
                    <header>
                        <h3>Take notes on How you do tricks.</h3>
                    </header>
                    <p>We'll help you learn tricks and keep track of tips and tricks that helped you learn a trick</p>
                </section>
                <section>
                    <header>
                        <h3>Record your tricks</h3>
                    </header>
                    <p>Add new notes for every new trick you learn as well as foot position, tips and tricks for doing the trick</p>
                </section>
                <section>
                    <header>
                        <h3>Learn from Others</h3>
                    </header>
                    <p>See others tips, foot placement etc for learning a specific trick.</p>
                </section>
            </div>
        )
    }
}

export default HomePage;