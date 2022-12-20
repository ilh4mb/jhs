/**
 * Copyright 2021 Ilham B
 * Modifications copyright (C) 2022 Ilham B
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var jhs = (element, meta) => {

    let el = document.createElement(element.toLowerCase()),
        attr = meta ? meta.attr : {},
        inner = meta ? meta.inner : '',
        callback = meta ? meta.todo : null;

    /**
     * 
     * @param {Mix} c = apapun yang akan di masukan ke element 
     */
    el.inner = (value) => {
        switch (typeof value) {
            case 'function':
                el.innerHTML = null;
                el.append(value(a));
                break;

            case 'boolean':
            case 'string':
                el.innerHTML = value;
                break;

            case 'object':
                if (Array.isArray(value)) {
                    value.forEach( d => {
                        el.append(d);
                    });
                } else {
                    el.append(value);
                }
                break;

            default:
                console.error("（；￣ェ￣） ERROR: can't set inner because value type is unknown !");
                break;
        }
    };

    el.attr = (attr, value) => {
        if (! value) value = false;
        el.setAttribute(attr, value);
    };

    el.todo = (callback) => {

        callback(el);
    };


    if (inner) el.inner(inner);

    if (attr) {

        Object.keys(attr).forEach((b) => {

            el.attr(b.replace(/[A-Z]/g, '-$&').toLowerCase(), attr[b]);
        });
    }

    if (callback) el.todo(callback);

    return el;
};