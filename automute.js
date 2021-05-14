const Action = require('./models/actions');

module.exports = cilent => {
    const checkMutes = async () => {
        
        const now = new Date();
    
        const conditional = {
          expires:{
            $lt: now
          },
          current: true
        }
    
        const results = await Action.find(conditional)
    
        if(results && results.length){
          for(const result of results){
            const { member } = result
            const member1 = (await guild.members.fetch()).get(member)
    
            const role = guild.roles.cache.find(role => {return role.name === 'Muted'});
            return member1.roles.remove(role);
          }
          await Action.updateMany(conditional, {
            current: false
          })
        }
        setTimeout(checkMutes, 1000 * 60 * 10);
    }
    checkMutes();

    cilent.on('guildMemberAdd', async member => {
        const { member } = member 
        const currentMute = await Action.findOne({
            action: 'Temp Mute',
            current: true, 
        })
        if(currentMute){ 
            const role = guild.roles.cache.find(role => {return role.name === 'Muted'});
            if(role) members.roles.add(role);
        }
    })
}