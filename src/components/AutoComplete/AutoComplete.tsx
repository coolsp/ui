// import React, { useState, useEffect, ChangeEvent } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Autosuggest from 'react-autosuggest';
// import Paper from '@material-ui/core/Paper';
// import deburr from 'lodash/deburr';
// import match from 'autosuggest-highlight/match';
// import parse from 'autosuggest-highlight/parse';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
// import Popper from '@material-ui/core/Popper';
// import AutoCompleteSuggestion from './AutoCompleteSuggestion';
// import AutoCompleteInput from './AutoCompleteInput';

// import useDebounce from '../../utils/hooks/useDebounce';

// import getSuggestionValue from './get-suggestion-value';

// const useStyles = makeStyles(theme => ({
//   root: {
//     height: 250,
//     flexGrow: 1,
//   },
//   container: {
//     position: 'relative',
//   },
//   suggestionsContainerOpen: {
//     position: 'absolute',
//     zIndex: 1,
//     marginTop: theme.spacing(1),
//     left: 0,
//     right: 0,
//   },
//   suggestion: {
//     display: 'block',
//   },
//   suggestionsList: {
//     margin: 0,
//     padding: 0,
//     listStyleType: 'none',
//   },
//   divider: {
//     height: theme.spacing(2),
//   },
// }));

// interface Props {
//   placeholder?: string;
//   onFetchSuggestions: (searchTerm: string) => Promise<Array<any>>;
// }

// const AutoComplete: React.FC<Props> = ({ placeholder, onFetchSuggestions }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [searchTerm, setSearchTerm] = useState();
//   const [suggestions, setSuggestions] = useState<Array<any>>([]);
//   const [isSearching, setIsSearching] = useState();

//   const debouncedSearchTerm = useDebounce(searchTerm, 300);

//   useEffect(
//     () => {
//       if (debouncedSearchTerm) {
//         setIsSearching(true);
//         onFetchSuggestions(debouncedSearchTerm).then(results => {
//           setIsSearching(false);
//           setSuggestions(results);
//         });
//       } else {
//         setSuggestions([]);
//       }
//     },
//     [debouncedSearchTerm]
//   );

//   const handleSuggestionsClearRequested = () => {
//     setSuggestions([]);
//   };

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSuggestionsFetchRequested = ({ value }) => {
//     console.log('value', value);
//     setSuggestions([]);
//   };

//   function renderSuggestion(suggestion, { query, isHighlighted }) {
//     const matches = match(suggestion.label, query);
//     const parts = parse(suggestion.label, matches);

//     return (
//       <MenuItem selected={isHighlighted} component="div">
//         <div>
//           {parts.map(part => (
//             <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
//               {part.text}
//             </span>
//           ))}
//         </div>
//       </MenuItem>
//     );
//   }

//   const autosuggestProps = {
//     renderInputComponent: AutoCompleteInput,
//     suggestions,
//     onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
//     onSuggestionsClearRequested: handleSuggestionsClearRequested,
//     getSuggestionValue,
//   };

//   return (
//     <div className={classes.root}>
//       <Autosuggest
//         {...autosuggestProps}
//         inputProps={{
//           classes,
//           placeholder,
//           value: searchTerm,
//           onChange: handleChange,
//         }}
//         theme={{
//           container: classes.container,
//           suggestionsContainerOpen: classes.suggestionsContainerOpen,
//           suggestionsList: classes.suggestionsList,
//           suggestion: classes.suggestion,
//         }}
//         renderSuggestion={props => {
//           console.log('props', props);
//           return { label: 'x' };
//         }}
//         renderSuggestionsContainer={options => (
//           <Paper {...options.containerProps} square>
//             {options.children}
//           </Paper>
//         )}
//       />
//     </div>
//   );
// };

// export default AutoComplete;

import React from 'react';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map(part => (
          <span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
            {part.text}
          </span>
        ))}
      </div>
    </MenuItem>
  );
}

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        const keep = count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

const useStyles = makeStyles(theme => ({
  root: {
    height: 250,
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing(2),
  },
}));

function IntegrationAutosuggest() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [state, setState] = React.useState({
    single: '',
    popper: '',
  });

  const [stateSuggestions, setSuggestions] = React.useState([]);

  const handleSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleChange = name => (event, { newValue }) => {
    setState({
      ...state,
      [name]: newValue,
    });
  };

  const autosuggestProps = {
    renderInputComponent,
    suggestions: stateSuggestions,
    onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
    onSuggestionsClearRequested: handleSuggestionsClearRequested,
    getSuggestionValue,
    renderSuggestion,
  };

  return (
    <div className={classes.root}>
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          placeholder: 'Search a country (start with a)',
          value: state.single,
          onChange: handleChange('single'),
        }}
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Paper {...options.containerProps} square>
            {options.children}
          </Paper>
        )}
      />
      <div className={classes.divider} />
      <Autosuggest
        {...autosuggestProps}
        inputProps={{
          classes,
          label: 'Label',
          placeholder: 'With Popper',
          value: state.popper,
          onChange: handleChange('popper'),
          inputRef: node => {
            setAnchorEl(node);
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
        theme={{
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderSuggestionsContainer={options => (
          <Popper anchorEl={anchorEl} open={Boolean(options.children)}>
            <Paper square {...options.containerProps} style={{ width: anchorEl ? anchorEl.clientWidth : undefined }}>
              {options.children}
            </Paper>
          </Popper>
        )}
      />
    </div>
  );
}

export default AutoComplete;
