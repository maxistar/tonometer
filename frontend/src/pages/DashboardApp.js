import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import {
  AppWeeklySales,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppConversionRates,
  InfoPanel
} from '../components/_dashboard/app';
import TonCoinPrice from "../components/_dashboard/app/TonCoinPrice";

export default function DashboardApp(props) {
  const {data, priceData} = props;
  const {info, general} = data;

  return info ? (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">TON Main Metrics</Typography>
        </Box>


        <Grid container spacing={3}>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={general.price.toFixed(4)} label={'Price $\n'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={general.latency} label={'TON.th Latency (ms)\n'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._cur_validators} label={'Current number of validators'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_mc_cnt2048} label={'cnt2048 creatorstats for masterchain'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_mc_cnt65536} label={'cnt65536 creatorstats for masterchain'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_mc_total} label={'Total creatorstats for masterchain'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._elections_stakes} label={'Amount of stakes for current elections'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._elections_participants} label={'Number of participants in elections\n'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_shard_total} label={'Total creatorstats for shardchains\n'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_shard_cnt2048} label={'cnt2048 creatorstats for shardchains\n'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._creatorstats_shard_cnt65536} label={'cnt65536 creatorstats for shardchains\n'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <InfoPanel value={info._transactions} label={'Transactions counter\n'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            {priceData ? (<TonCoinPrice priceData={priceData} />) : (<div>Loading...</div>)}
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

        </Grid>
      </Container>
    </Page>
  ) : (<div>Loading...</div>);
}
