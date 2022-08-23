import axios from "axios";

export default {
    methods: {
        async $get(url, param) {
            return (await axios.get(url, {
                params : param
            }).catch(e => {
                console.log(e);
            })
            ).data;
        },
        
        async $post(url, data) {
            return (await axios({
                method: 'post',
                url,
                data
            }).catch(e => {
                console.error(e);
            })).data;
        },

        async $delete(url, param) {
            return (await axios.delete(url, {
                params : param
            }).catch(e => {
                console.log(e);
            })).data;
        },


        $base64(file) {
            return new Promise(resolve => {
                const fr = new FileReader();
                fr.onload = e => {             //로딩이 끝나면 e 실행
                    resolve(e.target.result);  //파일 로드의 결과값
                }
                fr.readAsDataURL(file);        //imageInsert의 101line image에 값이 들어간다.
            });
        }
    }
}