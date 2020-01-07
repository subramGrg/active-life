import React, { Component } from 'react'
import {
  StyleSheet, View, ActivityIndicator, Image
} from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'

import { DARK } from '@styles/colors'
import Page from '@components/Page'
import Text from '@components/Text'
import Timeline from '@components/Timeline'
import { STRINGS } from '@localization/Strings'
import { statusImage, format } from './internals'

const mapStateToProps = (state) => ({
  inProgress: state.challenges.in_progress,
  pastChallenges: state.challenges.pastChallenges,
})

const mapDispatchToProps = (dispatch) => ({
  getPastChallenges: (payload) => dispatch({ type: 'GET_PAST_CHALLENGES', payload, }),
  makeRequest: () => dispatch({ type: 'MAKE_CHALLENGE_REQUEST', }),
  resetRequest: () => dispatch({ type: 'RESET_CHALLENGE_REQUEST', }),
})

const styles = StyleSheet.create({
  pastChallengesContainer: {
    paddingHorizontal: 15,
  },
  image: {
    width: 65,
    height: 90,
    marginRight: 17,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
  },
  container: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: '#dedede',
    borderStyle: 'solid',
    borderRadius: 4,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.2,
    backgroundColor: '#fff',
    shadowRadius: 2,
    elevation: 2,
  },
  pageTitle: {
    paddingTop: 15,
  },
  innerContainer: {
    flex: 1,
    marginTop: 12.5,
    marginRight: 12.5,
  },
  challengeInfoContainer: {
    flexDirection: 'row',
    marginBottom: 9.5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeName: {
    height: 22,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12.5,
  },
  statusImageContainer: {
    width: 18,
    height: 18,
    backgroundColor: '#a1a1a1',
    borderRadius: 9,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultGraph: {
    marginTop: 8.5,
    borderRadius: 2,
    overflow: 'hidden',
    backgroundColor: '#f7f7f7',
    height: 4.5,
  },
  lineGraph: {
    backgroundColor: '#06b0b3',
    borderRadius: 2,
    overflow: 'hidden',
    height: 4.5,
    width: '100%',
  },
  status: {
    width: 10,
    height: 10,
    tintColor: '#fff',
  },
  textStyle: {
    fontSize: 12.5,
  },
  scoreTotal: {
    fontSize: 12.5,
    color: '#a1a1a1',
  },
  leaderboardWon: {
    backgroundColor: '#06b0b3',
  },
  loader: {
    marginTop: 40,
  },
})

const navigatBack = ({ goBack, }) => () => goBack()

class PastChallenges extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: false,
      errorMessage: null,
    }

    this.renderPastChallenges = this.renderPastChallenges.bind(this)
  }

  async componentDidMount() {
    const { makeRequest, getPastChallenges, resetRequest, } = this.props
    makeRequest()

    try {
      const challengesResponse = await axios.get('https://demo.api.activelife.io/coding_exercise')
      getPastChallenges(challengesResponse)
    } catch (err) {
      console.log(err)
    } finally {
      resetRequest()
    }
  }

  renderPastChallenges(pastChallenges) {
    const { errorMessage, error, } = this.state

    return (
      (error)
        ? <View><Text>{errorMessage}</Text></View>
        : (
          <View style={styles.pastChallengesContainer}>
            {pastChallenges.map(({ month_year, challenges, }) => (
              <Timeline key={month_year} title={month_year}>
                {challenges.map((challenge) => (
                  this.renderChallenge(challenge)
                ))}
              </Timeline>
            ))}
          </View>
        )
    )
  }

  renderChallenge({
    type, name, won, activity_score, activity_score_goal, date, image_url, participants, rank,
  }) {
    return (
      <View key={`${type}-${name}`} style={styles.container}>
        <Image
          source={{ uri: image_url, }}
          style={styles.image}
        />
        <View style={styles.innerContainer}>
          <View style={styles.challengeInfoContainer}>
            <Text style={styles.challengeName}>{name}</Text>
            <Text style={[styles.date, styles.textStyle]}>{date}</Text>
          </View>
          {this.renderScore({
            type, activity_score, activity_score_goal, participants, rank, won,
          })}
          {type === 'timer' && this.renderResultGraph({ activity_score, })}
        </View>
      </View>
    )
  }

  renderResultGraph({ activity_score, }) {
    return (
      <View style={styles.resultGraph}>
        <Text style={[styles.lineGraph, (activity_score < 100) && { width: `${activity_score}%`, }]} />
      </View>
    )
  }

  renderScore({
    type, activity_score, activity_score_goal, participants, rank, won,
  }) {
    return (
      <View style={styles.scoreContainer}>
        {(type === 'leaderboard')
          ? (
            <Text>
              <Text style={styles.textStyle}>#{format(rank)} / </Text>
              <Text style={styles.scoreTotal}>{format(participants)}</Text>
            </Text>
          )
          : (
            <Text>
              <Text style={styles.textStyle}>{activity_score} / </Text>
              <Text style={styles.scoreTotal}>{activity_score_goal}</Text>
            </Text>
          )}

        <View style={[styles.statusImageContainer, won && styles.leaderboardWon]}>
          <Image
            source={statusImage({ won, type, rank, })}
            style={styles.status}
          />
        </View>
      </View>
    )
  }

  render() {
    const { inProgress, pastChallenges, } = this.props

    return (
      <Page goBack={navigatBack(this.props.navigation)} leftIcon="left" title={STRINGS.PastChallengesTitle} titleStyle={styles.pageTitle} showUnderline>
        {
          (inProgress)
            ? <ActivityIndicator size="small" color={DARK} style={styles.loader} />
            : this.renderPastChallenges(pastChallenges)
        }
      </Page>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PastChallenges)
