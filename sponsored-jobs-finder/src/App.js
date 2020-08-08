import React, {Component} from 'react'
import {fromJS} from "immutable";
import {providers} from "./utils/providers";
import './scss/App.scss';
import Marker from 'pigeon-marker'
import {ListFilter} from "./components/list-filter";
import Map from "pigeon-maps";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredList: fromJS([]),
            center: [53.37812, -1],
            zoom: 6,
            provider: 'osm',
            animating: false,
            minZoom: 1,
            maxZoom: 18
        };

        this.applyFilter = this.applyFilter.bind(this);
    }

    zoomIn = () => {
        this.setState({
            zoom: Math.min(this.state.zoom + 1, 18)
        })
    };

    zoomOut = () => {
        this.setState({
            zoom: Math.max(this.state.zoom - 1, 1)
        })
    };

    handleBoundsChange = ({center, zoom, bounds, initial}) => {
        if (initial) {
            console.log('Got initial bounds: ', bounds)
        }
        this.setState({center, zoom})
    };

    handleClick = ({event, latLng, pixel}) => {
        console.log('Map clicked!', latLng, pixel)
    };

    handleMarkerClick = ({event, payload, anchor}) => {
        console.log(`Marker #${payload} clicked at: `, anchor)
    };

    handleAnimationStart = () => {
        this.setState({animating: true})
    };

    handleAnimationStop = () => {
        this.setState({animating: false})
    };
    applyFilter(filteredList) {
        this.setState({filteredList: filteredList}, null);
    }


    renderMap() {
        const {
            center,
            zoom,
            provider,
            minZoom,
            maxZoom
        } = this.state;

        return (
            <div style={{textAlign: 'center'}}>
                <div className={'map-container'}>
                    <Map
                        limitBounds='edge'
                        center={center}
                        zoom={zoom}
                        provider={providers[provider]}
                        dprs={[1, 2]}
                        onBoundsChanged={this.handleBoundsChange}
                        onClick={this.handleClick}
                        onAnimationStart={this.handleAnimationStart}
                        onAnimationStop={this.handleAnimationStop}
                        animate={true}
                        twoFingerDrag={false}
                        zoomSnap={true}
                        mouseEvents={true}
                        touchEvents={true}
                        minZoom={minZoom}
                        maxZoom={maxZoom}
                        attribution={null}
                        defaultWidth={600}
                        width={1000}
                        height={500}
                        boxClassname="pigeon-filters">
                        {
                            this.state.filteredList.map(data => {
                                const anchor = [data.get('lat'), data.get('lng')];
                                return (
                                    <Marker key={data.get('id')}
                                            anchor={anchor}
                                            payload={data.get('organizationName')}
                                            onClick={this.handleMarkerClick}/>
                                )
                            })
                        }
                    </Map>

                    <div className={'markers-list'}>
                        <ul>
                            {this.state.filteredList.size === 0 && <li>Please select the desired filters to search</li>}
                            {this.state.filteredList.map(data => {
                                const anchor = [data.get('lat'), data.get('lng')];
                                return (
                                    <li key={data.get('id')}
                                        onClick={() => this.setState({center: anchor, zoom: 10})}>
                                        {data.get('organisation_name')}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <button onClick={this.zoomIn}>Zoom In</button>
                    <button onClick={this.zoomOut}>Zoom Out</button>
                </div>

                <div style={{marginTop: 20}}>
                    minZoom: <input onChange={(e) => this.setState({minZoom: parseInt(e.target.value) || 1})}
                                    value={minZoom} type='number' style={{width: 40}}/>
                    {' '}
                    maxZoom: <input onChange={(e) => this.setState({maxZoom: parseInt(e.target.value) || 18})}
                                    value={maxZoom} type='number' style={{width: 40}}/>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>Select Filters <ListFilter onClick={this.applyFilter}/></div>
                {this.renderMap()}
            </div>);
    }
}
