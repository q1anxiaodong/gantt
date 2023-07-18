# 音乐播放器范式组件

更新日志，格式参考自 [keep a changelog](https://keepachangelog.com/)。

## [Unreleased]

### Added

### Changed

### Removed

### Added

## [0.1.1] - 2022-07-15

### Added

- 新增`changeMusicByMood`方法。 @yuguanhao

```typescript
enum Mood {
  positive = 1,
  negative = -1,
  neutral = 0
}
const musicPlayer = new DynamicChart.MusicPlayer('#music', { probability: 0.33, mood: Mood.negative})
musicPlayer.changeMusicByMood(Mood.positive);
```

### Changed

- 销毁组件时，不会移除根节点。@yuguanhao


## [0.1.0] - 2022-07-11

### Added

- 配置项
  - 新增 `option.mood` 和 `option.probability` 配置，方便自定义设置重点音乐的播放概率和音乐的情绪分类。 @yuguanhao
