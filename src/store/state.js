const playMode = {
  sequence: 0, // 顺序播放
  loop: 1, // 单曲循环
  random: 2 // 随机播放
};

const state = {
  // 推荐页歌单
  songlist: {},
  // 歌手信息
  singer: {},
  // 音乐排行
  rankList: {},
  // 播放器播放状态
  playing: false,
  // 播放器展开状态
  fullScreen: false,
  // 播放歌曲列表
  playlist: [],
  // 播放模式
  mode: playMode.sequence

};

export default state;
