import { useState, useEffect, useRef } from 'react';

//abort fetch req, cleanup func
export const useFetch = (url,_options) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false)
    // handle fetch error
    const [error, setError] = useState(null);
    //use useRef to wrap an object/array argument, which is a useEffect dependency
    const options = useRef(_options).current
    useEffect(() => {
        console.log(options)
        const controller = new AbortController();
        const fetchData = async () => {
            setIsPending(true)
            try {

                const response = await fetch(url,{signal:controller.signal})
                if (!response.ok) {
                    throw new Error(response.statusText)// this line will sent you to catch block with res.statusText msg as err
                }
                const json = await response.json();
                setError(null)
                setData(json)
            } catch (err) {
                if(err.name === "AbortError"){
                    console.log("Fetch Req Aborted")
                }
                else {
                    setError('Could not fetch the data');
                    console.log(err.message)
                    setIsPending(false)
                }
            }

        }
        fetchData();
        // cleanup func
        return () =>{
            controller.abort();
        }
    }, [url,options])
    return { data, isPending, error };
}
