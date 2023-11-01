import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import validator from 'validator'
import "./Styles.scss"

export default function TagsInput(props) {
  const { onSelectTags, tags, setTags, ...other } = props;
  const [ selectedItem, setSelectedItem ] = useState([]);

  useEffect(() => {
    setSelectedItem(tags);
  }, [tags]);

  const handleDelete = (item) => () => {
    setTags(removeTag(item, tags));
    return item;
  };

  const handleTabDown = (el) => {
    ;
    let valorInput: string = el.target.value;
    addEmail(valorInput);
    el.target.value = '';
  }

  const handleChange = (el: Element) => {
    
    const valorInput: string = el['value'];
    const classList = el.classList;

    const emailsValidos: boolean = splitEmails(valorInput).length === emailValidate(splitEmails(valorInput)).length;
    
    if(emailsValidos){
        if(classList.contains('danger'))
        classList.remove('danger')
    }else {
      if(!classList.contains('danger'))
        classList.add('danger')
    }
  }

  const addEmail = (emails) => {
    const newEmails = splitEmails(emails);
    if(!!newEmails && newEmails.length > 0){
      setTags([...tags, ...emailValidate(newEmails)])
    }
  }

  const emailValidate = (emails: string[]): string[] => {
    const validEmails: string[] = [];

    emails.forEach(em => {
      if(validator.isEmail(em))
        if(![...tags].includes(em)) 
          validEmails.push(em);
    });
    return validEmails;
  }

  const splitEmails = (input: string): string[] => {
    input = input.split(" ").join("");
    if(!!input)
      return input.split(';');
    return [];
  }

  const removeTag = (item: string, tags: string[]): string[] => {
    return tags.filter(tg => tg !== item);
  }

  return (
    <TextField
      className="flex-container"
      onKeyDownCapture={ (e: any) => {
        if (e.key === "Tab") {
          handleTabDown(e);
          e.preventDefault();
        }
      }}
      onChange={ (e: any) => {
        handleChange(e.target)
      }}
      InputProps={{
        startAdornment: selectedItem.map((item) => (
          <Chip
            key={item}
            tabIndex={-1}
            label={item}
            onDelete={handleDelete(item)}
          />
        ))
      }}
      {...other}
    />
  );
}
TagsInput.defaultProps = {
  tags: [],
  setTags: () => {}
};


