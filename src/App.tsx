import React, { useState, useEffect } from 'react';
import TagsInput from './components/tag-input/TagsInput';
import api from './Api';

const App: React.FC = () => {
  function handleSelecetedTags(items: string[]) {
    return items;
  }

  const [tags, setTags] = useState<string[]>();
  
  useEffect(() => {
    const getTegsApi = async () => {
      // const queryId = null;
      const queryId = '8daa588f-46c9-65e7-a432-56e4c823073e';
      
      setTags(await getTagsById(queryId));
    }
    getTegsApi();
  }, []);

  useEffect(()=> {
    const updateTegsApi = async () => {
      const queryId = '8daa588f-46c9-65e7-a432-56e4c823073e';
      await updateTagsById(queryId, tags);
    }
    updateTegsApi();
  }, [tags]);

  const getTagsById = async (id: string) => {
    let query = ''

    if(!!id){
      query = `?id=${id}`
    }
    const response = await api.get(`/mailing-lists${query}`);
    const data = await response.data;
    return data[0].emails;
  }

  const updateTagsById = async (id: string, tags) => {
    let query = ''
    
    if(!id || !tags)
      return

    // todo: ajustar query ou parametros
    // const response = await api.patch(`/mailing-lists${query}`, { emails : tags});
    // const data = await response.data;
  }

  return (
    <div className="App">
      <TagsInput
        onSelectTags={handleSelecetedTags}
        fullWidth
        variant="outlined"
        id="tags"
        name="tags"
        placeholder="add Tags"
        label="tags"
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
}

export default App;