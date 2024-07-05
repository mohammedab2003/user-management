
import { auth } from '@/firebase/db'
import { defineStore } from 'pinia'

export const useUser = defineStore('posts', {
  state: () => ({
    user: null
  }),

  actions:{
   fetchUser(){
    user = auth.currentUser
   }
  },
})
