import React, {useState} from "react";
import {COMPANIES} from './../companies_list'
import {fromJS} from "immutable";
import './../scss/list-filter.scss';



export const INDUSTRIES = ['administrative and support',
    'advertising',
    'agriculture',
    'architecture',
    'arts ',
    'entertainment',
    'betting',
    'call center',
    'care home',
    'civil engineering',
    'computer programming',
    'construction',
    'dental',
    'education',
    'electricity',
    'gas',
    'steam',
    'air',
    'finance',
    'insurance',
    'food & accomodation',
    'houselhold',
    'it',
    'telecommunication',
    'legal',
    'management',
    'manufacturing',
    'medical',
    'mining and quarrying',
    'others',
    'public administration',
    'government',
    'publishing',
    'radio and television',
    'real estate',
    'recruitment',
    'religious',
    'rental',
    'scientific research',
    'security',
    'social work',
    'software publishing',
    'transportation & storage',
    'travel and tourism',
    'vetenary',
    'video or music production',
    'water',
    'waste management',
    'wholesale & retail'
];

export const MAIN_TIERS = ['tier 2 (a (premium))'
    , 'tier 2 (a (sme+))'
    , 'tier 2 (a rating)'
    , 'tier 2 (b rating)'
    , 'tier 5 (a rating)'
    , 'tier 5 (b rating)'
    , 'tier 5tw (a (premium))'
    , 'tier 5tw (a rating)'
    , 'tier 5tw (b rating)'
    , 'tier 5tw (highly trusted sponsor)'];


export const  ListFilter  = ({onClick}) => {
    let filteredList = [];
    const [industry, setIndustry] = useState(INDUSTRIES[0]);
    const [mainTier, setMainTier] = useState(MAIN_TIERS[0]);

    const handleClick = (event) => {
        filteredList = COMPANIES.filter(company => company['industry'].includes(industry) && company['main_tier'].includes(mainTier));
        onClick(fromJS(filteredList))
    };


    return (
        <div className={'filter'}>
            <span className={'industry'}>
                <label>Industry</label>
                <select onChange={e => setIndustry(e.target.value)}>{INDUSTRIES.map(i =>
                    <option value={i} key={i}>{i}</option>)}</select>
            </span>

            <span className={'tier'}>
                <label>Tier</label>
                <select onChange={e => setMainTier(e.target.value)}>{MAIN_TIERS.map(i =>
                    <option value={i} key={i}>{i}</option>)}</select>
            </span>


            <button onClick={() => handleClick()}>filter</button>

        </div>
    )
};
