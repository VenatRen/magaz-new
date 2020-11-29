import { useEffect, useState, useCallback } from 'react';

// Типы данных
export const DATA_TYPE_ARRAY_BUFFER = 0;
export const DATA_TYPE_BLOB         = 1;
export const DATA_TYPE_FORM_DATA    = 2;
export const DATA_TYPE_JSON         = 3;
export const DATA_TYPE_TEXT         = 4;

const DEFAULT_OPTIONS = { method: "GET" }; // Опции fetch
const EMPTY_FUNC = ()=>{};

/*
 * Хук, для выполнения сетевых операций
 * @param {string} url - URL для отправки запроса
 * @param {object} options - опции запроса
 * @param {number} - тип возвращаемых данных
 * @param {function} - коллбэк при монтировании
 * @param {function} - коллбэк при успешном запросе
 * @param {function} - коллбэк при ошибке
 * @param {function} - коллбэк при отмене
 * @returns {object/array}
 */
const useFetch = (url,
                  options=DEFAULT_OPTIONS,
                  type=DATA_TYPE_JSON,
                  onMount=EMPTY_FUNC,
                  onSuccess=EMPTY_FUNC,
                  onError=EMPTY_FUNC,
                  onAbort=EMPTY_FUNC) => {

    const [data, setData] = useState(null); // Стейт для данных
    const [loading, setLoading] = useState(true); // Стейт загрузки
    const [error, setError] = useState(null); // Стейт ошибки
    const [abortController, setAbortController] = useState(new AbortController());

    // 
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);

            // Создаем новый контроллер
            // Без сброса, в случае, если была отмена, запроса не произойдёт
            setAbortController(new AbortController());

            // Вызываем коллбэк при монтировании
            onMount(setLoading, setError, abortController);

            // Выполняем запрос
            const response = await fetch(url, {...options, signal: abortController.signal});
            let data = null;

            // Преобразуем данные в нужный нам формат
            try {
                switch (type) {
                    case DATA_TYPE_ARRAY_BUFFER: {
                        data = await response.arrayBuffer();
                        break;
                    }
                    case DATA_TYPE_BLOB: {
                        data = await response.blob();
                        break;
                    }
                    case DATA_TYPE_FORM_DATA: {
                        data = await response.formData();
                        break;
                    }
                    case DATA_TYPE_JSON: {
                        data = await response.json();
                        break;
                    }
                    case DATA_TYPE_TEXT: {
                        data = await response.text();
                        break;
                    }
                }
            } catch (Error) {
                // Говорим стейту, что произошла какая-то ошибка
                setError(Error);
                // Вызываем коллбэк
                onError(Error);
            }
            setData(data);
            onSuccess(data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            
            // Отмена запроса является ошибкой
            // Обработаем её здесь
            if ( err.name !== "AbortError" ) {
                setError(err);
                onError(err);
            } else {
                // Вызываем коллбэк при отмене запроса
                onAbort();
                console.log(`Fetch from url ${url} aborted!`);
            }
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return Object.assign([data, loading, error, fetchData, abortController], { data, loading, error, fetchData, abortController });
};

export default useFetch;