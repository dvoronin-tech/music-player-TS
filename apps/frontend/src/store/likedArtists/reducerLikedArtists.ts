import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import type { ApiArtist } from "@music-player/backend";
import { serverUrl } from "@/utils/constants";

interface IArtistsState {
    likedArtists: ApiArtist[],
    loading: boolean,
    error: string | undefined,
}

const initialState: IArtistsState = {
    likedArtists: [],
    loading: false,
    error: undefined,
}

export const loadLikedArtists = createAsyncThunk<ApiArtist[], undefined, {rejectValue: string}>(
    '@@artists/LOAD_LIKED_ARTISTS',
    async (_, {rejectWithValue}) => {
        try {
            const response = await fetch(serverUrl + '/api/users/getlikedartists/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Token': localStorage.getItem('Token')!
                }
            })
            const data = await response.json();
            return data.map((item: any) => ({
                id: item.id,
                name: item.name,
                artistImg: serverUrl + item.artistImg,
                bigImg: serverUrl + (item.big_img || item.bigImg),
                likes: item.likes,
                trackIds: item.tracks || item.trackIds || [],
            }));
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error.message);
                return rejectWithValue('При получении подписок произошла ошибка')
            }
        }
    }
)

export const toggleArtist = createAsyncThunk<ApiArtist[], string | number, {rejectValue: string}>(
    '@@artists/TOGGLE_ARTISTS',
    async (artistId, {rejectWithValue}) => {
        try {
            const response = await fetch(serverUrl + '/api/users/toggleartists/', {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Token': localStorage.getItem('Token')!
                },
                body: JSON.stringify({'liked_artists': [artistId]})
            })
            const data = await response.json();
            return data.map((item: any) => ({
                id: item.id,
                name: item.name,
                artistImg: serverUrl + item.artistImg,
                bigImg: serverUrl + (item.big_img || item.bigImg),
                likes: item.likes,
                trackIds: item.tracks || item.trackIds || [],
            }));
        } catch (err) {
            if (err) {
                const error = err as Error;
                console.log(error.message);
                return rejectWithValue('Не удалось подписаться на артиста');
            }
        }
    }
)

const likedArtistsReducer = createReducer(initialState, (builder) => [
    builder
        .addCase(toggleArtist.fulfilled, (state, {payload}) => {
            state.likedArtists = payload;
            state.loading = false;
            state.error = undefined;
        })
        .addCase(toggleArtist.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(toggleArtist.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
        .addCase(loadLikedArtists.fulfilled, (state, {payload}) => {
            state.likedArtists = payload;
            state.loading = false;
            state.error = undefined;
        })
        .addCase(loadLikedArtists.pending, (state) => {
            state.loading = true;
            state.error = undefined;
        })
        .addCase(loadLikedArtists.rejected, (state, {payload}) => {
            state.error = payload;
            state.loading = false;
        })
])

export default likedArtistsReducer;