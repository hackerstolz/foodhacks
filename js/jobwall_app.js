 var jobs_url = 'http://jobs.food-hacks.de/jobs'
     var sponsors_url = 'http://jobs.food-hacks.de/sponsors'

      var JobWall = React.createClass({
            loadSponsorsFromServer: function() {
              $.ajax({
                url: sponsors_url,
                dataType: 'json',
                success: function(data) {
                    console.log(data)
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                  console.error(this.props.url, status, err.toString());
                }.bind(this)
              });
              },
            getInitialState: function() {
              return {data: []};
            },
            componentDidMount: function() {
              this.loadSponsorsFromServer();
            },
            render: function() {
              var sponsor_nodes = this.state.data.map(function(sponsor){
                 return (
               <Sponsor data={sponsor} key={sponsor.id} /> 
               );
              });
              return (
                <div className="jobWall">
                  <h1>food hacks Jobwall</h1>
                  {sponsor_nodes}
                </div>
              );
            }
          });
      var Sponsor = React.createClass({
        render: function() {
          return (
            <div className="sponsor">
                <h2 className="sponsor_title">
                  {this.props.data.sponsor_name}
                </h2>
                <JobList sponsor_id={this.props.data.id} /> 
            </div>
            )
        }

      })
      var JobList = React.createClass({
          loadCommentsFromServer: function(sponsor_id) {
              $.ajax({
                url: jobs_url+'?sponsor_id=eq.'+sponsor_id,
                dataType: 'json',
                success: function(data) {
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, err) {
                  console.error(this.props.url, status, err.toString());
                }.bind(this)
              });
          },
        getInitialState: function() {
              return {data: []};
            },
        componentDidMount: function() {
              this.loadCommentsFromServer(this.props.sponsor_id);
            },
        render: function(){
          console.log(this.state.data)
          var jobNodes = this.state.data.map(function(job){
           return (
            <Job data={job} key={job.id}>
              {job.job_description}
            </Job>
            );
          });
          return (
            <ul className="jobList">
              {jobNodes}
            </ul>
            )
        }
      })


      var Job = React.createClass({
         rawMarkup: function() {
          console.log(this.props.children.toString())
            var rawMarkup = marked(this.props.children.toString(), {gfm:true, sanitize: false,breaks:true});
            return { __html: rawMarkup };
          },
        render: function() {
          return (
            <li className="job">
                <h2 className="jobtitle">
                  {this.props.data.job_title}
                </h2>
                  <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </li>

            )
        }
      })

      ReactDOM.render(
        <JobWall/>,
        document.getElementById('content')
      );