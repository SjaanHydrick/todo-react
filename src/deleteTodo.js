import request from 'superagent';

export async function deleteCompletes(token, someId) {
        await request
        .delete(`https://gentle-inlet-53744.herokuapp.com/api/todo/${someId}`)
        .set('Authorization', token);

        return;
    }