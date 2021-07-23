// index.js
// 获取应用实例
const app = getApp()
import {Base64} from 'js-base64'

Page({
  onGetToken(){
    wx.login({
      success: res=>{
        if(res.code){
          console.log(res.code)
          wx.request({
            url:'http://localhost:3000/v1/token',
            method:'POST',
            data:{
              account: res.code,
              type: 100
            },
            success:res=>{
              console.log(res.data)
              const code = res.statusCode.toString()
              console.log('res',res.data.token)
              if(code.startsWith('2')){
                wx.setStorageSync('token',res.data.token)
              }
            }
          })
        }
      }
    })
  },
  onVerifyToken(){
    const token = wx.getStorageSync('token')
    console.log(token)
    wx.request({
      url:'http://localhost:3000/v1/token/verify',
      method:'POST',
      data:{
        token
      },
      success:res=>{
        console.log(res.data)
      }
    })
  },
  onGetLatest(){
    wx.request({
      url: 'http://localhost:3000/latest',
      method:'GET',
      success(res){
        console.log(res.data)
      },
      header:{
        Authorization: this._encode()
      }
    })
  },
  _encode(){
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token+':')
    return 'Basic ' +  base64 
  },
  onLike(){
    wx.request({
      url: 'http://localhost:3000/v1/like',
      method:'POST',
      data:{
        art_id: 1,
        type: 100
      },
      success(res){
        console.log(res.data)
      },
      header:{
        Authorization: this._encode()
      }
    })
  },
  onDisLike(){
    wx.request({
      url: 'http://localhost:3000/v1/dislike',
      method:'POST',
      data:{
        art_id: 1,
        type: 100
      },
      success(res){
        console.log(res.data)
      },
      header:{
        Authorization: this._encode()
      }
    })
  }
})
